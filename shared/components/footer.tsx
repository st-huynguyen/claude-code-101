export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center gap-2 px-4 py-8 text-center text-sm text-muted-foreground">
        <p className="font-medium text-foreground">eSIM Store</p>
        <p>Stay connected anywhere in the world with affordable eSIM plans.</p>
        <p>&copy; {new Date().getFullYear()} eSIM Store. All rights reserved.</p>
      </div>
    </footer>
  );
}
