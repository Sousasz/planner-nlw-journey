import { ComponentProps, ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

const buttonVariants = tv({
  base: "rounded-lg px-5 font-medium flex items-center justify-center gap-2 transition-all",

  variants: {

    buttonType: {
      primary: "bg-lime-300 text-lime-950 hover:bg-lime-400",
      secondary: "bg-zinc-800 text-zinc-200  hover:bg-zinc-700",
    },
    
    buttonSize: {
      default: "py-2",
      full: "w-full h-11 flex"
    }

  },

  defaultVariants: {
    buttonType: "primary",
    buttonSize: 'default'
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  children: ReactNode
}

export function Button({ children, buttonType, buttonSize ,...props }: ButtonProps) {
  return(
    <button {...props} className={buttonVariants({ buttonType, buttonSize })}>
      {children}
    </button>
  )
}