export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-blue-700 text-white text-center py-6 shadow-md mt-10">
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-4">
          <a href="https://www.linkedin.com/in/sekh-aship-217a93259/" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" 
              alt="LinkedIn" 
              className="w-6 h-6 transition-transform transform hover:scale-110"
            />
          </a>
          <a href="https://github.com/SekhAship" target="_blank" rel="noopener noreferrer">
            <img 
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
              alt="GitHub" 
              className="w-6 h-6 transition-transform transform hover:scale-110"
            />
          </a>
        </div>
        <p className="text-sm opacity-80">© {new Date().getFullYear()} Sekh Aship. All rights reserved.</p>
      </div>
    </footer>
  );
}
