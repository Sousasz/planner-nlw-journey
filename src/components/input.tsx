import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

const inputVariants = tv({
  base: "bg-transparent text-lg placeholder-zinc-400 outline-none",

  variants: {

    inputSize: {
      small: "w-40",
      default: "flex-1",
    }

  },

  defaultVariants: {
    inputSize: 'default'
  }
})

interface InputProps extends ComponentProps<"input">, VariantProps<typeof inputVariants> {}

export function Input({ inputSize,...props }: InputProps) {
  return (
    <input
      {...props}
      className={inputVariants({ inputSize })}
    />
  )
}