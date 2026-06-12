declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.css' {
  const content: never
  export default content
}

declare module '*.png' {
  const value: number
  export default value
}

declare module '*.jpg' {
  const value: number
  export default value
}

declare module '*.jpeg' {
  const value: number
  export default value
}

declare module '*.svg' {
  const value: any
  export default value
}

declare module '*.gif' {
  const value: number
  export default value
}

