import { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { Project } from '../data/projects';

export const ProjectModal = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    const element = dialog.current;
    if (!project || !element) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    setImageIndex(0);
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [project]);
  if (!project) return null;
  const index = imageIndex % project.gallery.length;
  const step = (direction: number) => setImageIndex(value => (value + direction + project.gallery.length) % project.gallery.length);
  const contact = `https://wa.me/554191941108?text=${encodeURIComponent(`Olá Felipe! Vi o projeto “${project.title}” no seu portfólio e gostaria de conversar sobre um projeto semelhante.`)}`;
  return (
    <dialog ref={dialog} className="project-dialog" aria-labelledby="project-title" onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose(); } }} onKeyDown={event => { if (event.key === 'Tab') { const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, a[href]')); const first = controls[0]; const last = controls[controls.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); } } if (event.key === 'ArrowRight') { event.preventDefault(); step(1); } if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); } }}>
      <div className="dialog-bar"><span>{project.category}</span><button type="button" className="icon-button" onClick={onClose} aria-label="Fechar projeto"><X aria-hidden="true" /></button></div>
      <div className="dialog-grid">
        <div className="gallery-viewer">
          <div className="gallery-stage"><img key={project.gallery[index]} src={project.gallery[index]} alt={`${project.title} — imagem ${index + 1} de ${project.gallery.length}`} width="1200" height="1200" /></div>
          <div className="gallery-controls"><button className="icon-button" type="button" aria-label="Imagem anterior" onClick={() => step(-1)}><ChevronLeft aria-hidden="true" /></button><span aria-live="polite">{index + 1} / {project.gallery.length}</span><button className="icon-button" type="button" aria-label="Próxima imagem" onClick={() => step(1)}><ChevronRight aria-hidden="true" /></button></div>
          <div className="gallery-thumbs">{project.gallery.map((src, i) => <button type="button" key={src} aria-label={`Ver imagem ${i + 1}`} aria-pressed={index === i} onClick={() => setImageIndex(i)}><img src={src.replace('.webp', '-preview.webp')} alt="" width="64" height="64" loading="lazy" /></button>)}</div>
        </div>
        <div className="project-story"><p className="section-label">{project.sector}</p><h2 id="project-title">{project.title}</h2><p>{project.description}</p><h3>Detalhes que fazem a diferença</h3><ul>{project.highlights.map(item => <li key={item}>{item}</li>)}</ul><h3>Ferramentas & disciplinas</h3><p className="project-tools">{project.tools.join(' / ')}</p><a href={contact} target="_blank" rel="noopener noreferrer" className="text-link">Conversar sobre um projeto <ArrowUpRight size={18} aria-hidden="true" /></a></div>
      </div>
    </dialog>
  );
};
