import z from 'zod';

export const passwordRegex = {
    lowerLetter: /^(?=.*[a-z]).*$/,
    upperLetter: /^(?=.*[A-Z]).*$/,
    specialChar: /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/,
    number: /^(?=.*\d).*$/,
    all: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/
}

export const zUserRegister = z.object({
    email: z.email(),
    password: z.string()
        .min(8, "A senha deve ter no mínimo 8 caracteres")
        .refine(val => /[a-z]/.test(val), "Deve conter ao menos uma letra minúscula")
        .refine(val => /[A-Z]/.test(val), "Deve conter ao menos uma letra maiúscula")
        .refine(val => /\d/.test(val), "Deve conter ao menos um número")
        .refine(val => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val), "Deve conter ao menos um caractere especial")
        .transform(v => v.trim()),
    name: z.string().min(5),
    username: z.string().min(5).transform(v => v.toLowerCase().trim()),
    'confirm-password': z.string()
}).refine((data) => data.password === data["confirm-password"], {
    message: "A senha e a confirmação devem ser iguais",
    path: ["confirm-password"],
});;

export const zUserLogin = z.object({
    email: z.email(),
    password: z.string().transform(v => v.trim())
});


