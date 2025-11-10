"use client"

import { Loader2, Send } from "lucide-react"
import { type FormEvent, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type FieldsType = {
  name: string
  email: string
  message: string
}

const DEFAULT_FIELDS_VALUES: FieldsType = {
  name: "",
  email: "",
  message: "",
}

export function FormSection() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState({ status: false, message: "" })
  const [fields, setFields] = useState<FieldsType>(DEFAULT_FIELDS_VALUES)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    if (!sent) return

    const timeout = setTimeout(() => {
      setSent(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [sent])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!fields.email || !fields.name || !fields.message) {
      setError({
        status: true,
        message: "Preencha todos os campos!",
      })
      return
    }
    setIsSending(true)
    setError({
      status: false,
      message: "",
    })

    const timeout = setTimeout(() => {
      setIsSending(false)
      setSent(true)
      setFields(DEFAULT_FIELDS_VALUES)
    }, 3000)

    return () => clearTimeout(timeout)
  }

  const handleChangeInput = (
    target: EventTarget & (HTMLInputElement | HTMLTextAreaElement),
  ) => {
    const { value, name } = target
    setError({ message: "", status: false })

    setFields((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <section className="z-10 relative contact-form">
      <form className="space-y-4 *:space-y-2 *:grid" onSubmit={handleSubmit}>
        {sent ? (
          <p className="font-detail text-green-500 text-lg">
            Mensagem enviada com sucesso!
          </p>
        ) : (
          <>
            <div>
              <label className="ml-3 font-detail font-medium" htmlFor="name">
                Nome
              </label>
              <Input
                id="name"
                name="name"
                onChange={({ target }) => handleChangeInput(target)}
                placeholder="Seu nome"
                value={fields.name}
              />
            </div>
            <div>
              <label className="ml-3 font-detail font-medium" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                name="email"
                onChange={({ target }) => handleChangeInput(target)}
                placeholder="exemplo@email.com"
                value={fields.email}
              />
            </div>
            <div>
              <label className="ml-3 font-detail font-medium" htmlFor="message">
                Mensagem
              </label>
              <Textarea
                id="message"
                name="message"
                onChange={({ target }) => handleChangeInput(target)}
                value={fields.message}
              />
            </div>

            {error.status && (
              <div>
                <p className="ml-3 font-detail text-destructive text-sm">
                  {error.message}
                </p>
              </div>
            )}

            <div className="mt-6">
              <Button
                aria-label="Enviar Mensagem"
                className="w-full"
                disabled={isSending}
                size="lg"
                type="submit"
              >
                {isSending ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    Enviando Mensagem
                  </>
                ) : (
                  <>
                    Enviar Mensagem
                    <Send className="size-5" />
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </form>
    </section>
  )
}
