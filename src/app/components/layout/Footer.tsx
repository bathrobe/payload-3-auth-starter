export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 shadow-sm p-3">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        <div>{/* You can add additional footer links or content here */}</div>
      </div>
    </footer>
  )
}
