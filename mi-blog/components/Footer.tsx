export default function Footer() {
  return (
    <footer className="border-t border-neutral-200/60 dark:border-neutral-800 mt-12">
      <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
        <p>
          © {new Date().getFullYear()} Mi Blog. Todos los derechos reservados.
        </p>
        <p>
          Hecho con <span aria-label="amor" role="img">❤️</span> y Next.js
        </p>
      </div>
    </footer>
  );
}
