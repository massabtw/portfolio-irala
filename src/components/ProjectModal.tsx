import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Project } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { translations } from '../data/translations';

export const ProjectModal = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const { language } = useLanguage();
  const { stopScroll, startScroll } = useSmoothScroll();
  const t = translations[language];

  useEffect(() => {
    const element = dialog.current;
    if (!project || !element) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    setImageIndex(0);
    stopScroll();
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      startScroll();
      previousFocus?.focus({ preventScroll: true });
    };
  }, [project, stopScroll, startScroll]);

  if (!project) return null;

  const details = t.projectDetails[project.id];
  const title = details?.title || project.title;
  const category = details?.category || project.category;
  const sector = details?.sector || project.sector;
  const description = details?.description || project.description;
  const highlights = details?.highlights || project.highlights;
  const tools = details?.tools || project.tools;

  const index = imageIndex % project.gallery.length;
  const step = (direction: number) =>
    setImageIndex(value => (value + direction + project.gallery.length) % project.gallery.length);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current || e.changedTouches.length !== 1) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        step(1); // Swiped left -> next photo
      } else {
        step(-1); // Swiped right -> previous photo
      }
    }
  };

  const contact = `https://wa.me/554191941108?text=${encodeURIComponent(t.modal.whatsappMessage(title))}`;

  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-title"
      onCancel={event => {
        event.preventDefault();
        onClose();
      }}
      onClick={event => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          ) {
            onClose();
          }
        }
      }}
      onKeyDown={event => {
        if (event.key === 'Tab') {
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]'));
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          step(1);
        }
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          step(-1);
        }
      }}
    >
      <div className="dialog-bar">
        <span>{category}</span>
        <button type="button" className="icon-button" onClick={onClose} aria-label={t.modal.close}>
          <X aria-hidden="true" />
        </button>
      </div>

      <div className="dialog-grid">
        <div className="gallery-viewer">
          <div className="gallery-stage" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <img
              key={project.gallery[index]}
              src={project.gallery[index]}
              alt={`${title} — ${t.modal.imageOf(index + 1, project.gallery.length)}`}
              width="1200"
              height="1200"
            />
          </div>
          <div className="gallery-controls">
            <button
              className="icon-button"
              type="button"
              aria-label={t.modal.prev}
              onClick={() => step(-1)}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <span aria-live="polite">
              {index + 1} / {project.gallery.length}
            </span>
            <button
              className="icon-button"
              type="button"
              aria-label={t.modal.next}
              onClick={() => step(1)}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
          <div className="gallery-thumbs">
            {project.gallery.map((src, i) => (
              <button
                type="button"
                key={src}
                aria-label={`${title} — ${t.modal.imageOf(i + 1, project.gallery.length)}`}
                aria-pressed={index === i}
                onClick={() => setImageIndex(i)}
              >
                <img
                  src={src.replace('.webp', '-preview.webp')}
                  alt=""
                  width="64"
                  height="64"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="project-story">
          <p className="section-label">{sector}</p>
          <h2 id="project-title">{title}</h2>
          <p>{description}</p>
          <h3>{t.modal.keyDetails}</h3>
          <ul>
            {highlights.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>{t.modal.toolsTitle}</h3>
          <p className="project-tools">{tools.join(' / ')}</p>
          <a href={contact} target="_blank" rel="noopener noreferrer" className="text-link">
            {t.modal.discussCta} <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </dialog>
  );
};
