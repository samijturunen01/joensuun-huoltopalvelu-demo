export type RequestType = 'huolto' | 'varaosa' | 'muu'

/** Service request payload – mirrors the fields of the original contact form. */
export interface ServiceRequest {
  requestType: RequestType
  name: string
  email: string
  phone: string
  street: string
  postalCode: string
  city: string
  brand: string
  appliance: string
  model: string
  articleNumber: string
  serialNumber: string
  purchaseDate: string
  warranty: '' | 'kylla' | 'ei' | 'en-tieda'
  description: string
  consent: boolean
}

export type FieldErrors = Partial<Record<keyof ServiceRequest, string>>

export interface SubmitResult {
  ok: boolean
  /** True when nothing was actually sent (demo mode). */
  demo: boolean
  message: string
}

/** Every delivery mechanism implements this – the UI never knows which one is active. */
export interface FormAdapter {
  submit(data: ServiceRequest): Promise<SubmitResult>
}
