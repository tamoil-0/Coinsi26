import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-[700px] flex-col justify-center px-5">
      <p className="font-mono text-[13px] text-gold">404</p>
      <h1 className="mt-3 font-display text-[48px] font-semibold leading-none">Esta página no existe.</h1>
      <p className="mt-4 text-muted">Puede que la oportunidad haya cambiado de dirección. Búscala en el directorio.</p>
      <Link href="/oportunidades" className="mt-8 w-fit rounded-full bg-gold px-5 py-2.5 font-semibold text-obsidian">
        Ir al directorio
      </Link>
    </div>
  );
}
