"use client";

import type { ReactNode } from "react";
import { CvData, CvSectionKey, Localized } from "@/lib/cv/types";
import { cn } from "@/lib/utils";

interface CvSheetProps {
  data: CvData;
  theme: "dark" | "light";
  lang: "es" | "en";
  onEditSection?: (key: CvSectionKey, jobId?: string) => void;
}

export function CvSheet({ data, theme, lang, onEditSection }: CvSheetProps) {
  const { identity, contact, profile, skills, tools, social, languages, references, education, experience } = data;

  const edit = (k: CvSectionKey, jobId?: string) => onEditSection?.(k, jobId);

  return (
    <div className="cv-sheet" data-theme={theme} aria-label="CV privado">
      <section className="page" id="page">
        <div className="page-bg" />
        <div className="topline" />

        <div className="frame">
          {/* ═══════ SIDEBAR ═══════ */}
          <aside className="side glass">
            <div className="glass-bg" aria-hidden="true" />

            <Editable k="identity" onEdit={edit} className="id">
              <div className="avatar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/profile-cristian.png" alt={identity.name} />
              </div>
              <h1>
                {identity.name.split(" ")[0]} <span className="g">{identity.name.split(" ").slice(1).join(" ")}</span>
              </h1>
              <div className="role">{identity.role[lang]}</div>
              <div className="role2">{identity.role2[lang]}</div>
              <div className="chips">
                {identity.chips.map((chip) => (
                  <span key={chip}>{chip}</span>
                ))}
              </div>
              <p className="tagline">
                {identity.tagline[lang].split(" ").slice(0, 2).map((w, i) => (
                  <span key={i}>
                    {i === 0 ? <b>{w} </b> : `${w} `}
                  </span>
                ))}
                {identity.tagline[lang].split(" ").slice(2).join(" ")}
              </p>
            </Editable>

            <Editable k="contact" onEdit={edit} className="no-border">
              <div className="label">{lang === "es" ? "Contacto" : "Contact"}</div>
              <div className="contact">
                <div title={contact.email}>
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                      <rect x="3" y="5" width="18" height="14" rx="2.5" />
                      <path d="M3.5 6.5 12 13l8.5-6.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="ct">{contact.email}</span>
                </div>
                <div title={contact.phone}>
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                      <path
                        d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 2 6a2 2 0 0 1 2-2Z"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="ct">{contact.phone}</span>
                </div>
                <div title={contact.location[lang]}>
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
                      <circle cx="12" cy="10" r="2.6" />
                    </svg>
                  </span>
                  <span className="ct">{contact.location[lang]}</span>
                </div>
              </div>
            </Editable>

            <Editable k="skills" onEdit={edit}>
              <div className="label">{lang === "es" ? "Habilidades" : "Skills"}</div>
              <div className="skills">
                {skills.map((group) => (
                  <div className="skillgrp" key={group.title[lang]}>
                    <div className="gt">{group.title[lang]}</div>
                    <div className="tags">
                      {group.tags.map((tag) => (
                        <span className={tag.highlight ? "tag hl" : "tag"} key={tag.text}>
                          {tag.text}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Editable>

            <Editable k="tools" onEdit={edit}>
              <div className="label">{lang === "es" ? "Herramientas & Tecnología" : "Tools & Technology"}</div>
              <div className="tools">
                {tools.map((tool) => (
                  <div className="tool" key={tool.name}>
                    <span className="ic">
                      {tool.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={`/cv/logos/tools/${tool.logo}`} alt={tool.name} />
                      ) : (
                        <span style={{ fontFamily: "var(--mono)", fontSize: 7, fontWeight: 800 }}>
                          {tool.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </span>
                    <span className="tn">{tool.name}</span>
                  </div>
                ))}
              </div>
            </Editable>

            <Editable k="social" onEdit={edit}>
              <div className="label">{lang === "es" ? "Redes" : "Social"}</div>
              <div className="social">
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21H9V9Z" />
                  </svg>
                  LinkedIn
                </a>
                <a href={social.portfolio} target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M14 4h4a2 2 0 0 1 2 2v4m0-6-8 8" />
                    <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" strokeLinecap="round" />
                  </svg>
                  {lang === "es" ? "Portafolio" : "Portfolio"}
                </a>
              </div>
            </Editable>

            <Editable k="languages" onEdit={edit}>
              <div className="label">{lang === "es" ? "Idiomas" : "Languages"}</div>
              <div className="langs">
                {languages.map((langItem) => (
                  <div className="lang" key={langItem.name[lang]}>
                    <div className="n">
                      {langItem.name[lang]}
                      <small>{langItem.level[lang]}</small>
                    </div>
                    <div className="bar">
                      <i style={{ width: `${langItem.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Editable>

            <Editable k="references" onEdit={edit}>
              <div className="label">{lang === "es" ? "Referencias" : "References"}</div>
              <div className="refs">
                {references.map((ref) => (
                  <div className="ref" key={ref.name}>
                    <span className="av">{ref.initials}</span>
                    <div>
                      <div className="rn">{ref.name}</div>
                      <div className="rr">
                        {ref.role[lang]} · <b>{ref.company}</b>
                      </div>
                      <div className="rt">{ref.phone}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Editable>

            <Editable k="education" onEdit={edit}>
              <div className="label">{lang === "es" ? "Educación" : "Education"}</div>
              <div className="edu">
                {education.map((edu) => (
                  <div className="row" key={`${edu.title[lang]}-${edu.date[lang]}`}>
                    {edu.logo ? (
                      <div className="logo">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/cv/logos/companies/${edu.logo}`} alt={edu.title[lang]} />
                      </div>
                    ) : (
                      <div className="logo mono">{edu.initials ?? edu.title[lang].slice(0, 3).toUpperCase()}</div>
                    )}
                    <div>
                      <div className="t">{edu.title[lang]}</div>
                      <div className="s">{edu.subtitle[lang]}</div>
                      <div className="d">{edu.date[lang]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Editable>
          </aside>

          {/* ═══════ MAIN ═══════ */}
          <div className="main">
            <Editable k="profile" onEdit={edit} className="panel glass">
              <div className="glass-bg" aria-hidden="true" />
              <div className="sec">
                <span className="n">01</span>
                <h2>{lang === "es" ? "Perfil Profesional" : "Professional Profile"}</h2>
                <span className="rule" />
              </div>
              <div className="perfil">
                {profile.map((paragraph, i) => (
                  <p key={i}>{renderRich(paragraph[lang])}</p>
                ))}
              </div>
            </Editable>

            <Editable k="experience" onEdit={edit} className="panel glass">
              <div className="glass-bg" aria-hidden="true" />
              <div className="sec">
                <span className="n">02</span>
                <h2>{lang === "es" ? "Experiencia" : "Experience"}</h2>
                <span className="rule" />
              </div>
              <div className="jobs">
                {experience.map((job) => (
                  <Editable key={job.id} k="experience" jobId={job.id} onEdit={edit} className="job-wrap">
                    <article className="job">
                      <div className="hd">
                        {job.logo ? (
                          <div className="logo">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/cv/logos/companies/${job.logo}`} alt={job.company[lang]} />
                          </div>
                        ) : (
                          <div className="logo mono">{job.company[lang].slice(0, 3).toUpperCase()}</div>
                        )}
                        <div className="hinfo">
                          <div className="role">{job.role[lang]}</div>
                          <div className="co">{job.company[lang]}</div>
                        </div>
                        <div className="when">
                          <div className="d">{job.dates[lang]}</div>
                          <div className="loc">{job.location[lang]}</div>
                        </div>
                      </div>
                      <ul>
                        {job.bullets.map((bullet, bi) => (
                          <li key={bi}>{renderRich(bullet[lang])}</li>
                        ))}
                      </ul>
                    </article>
                  </Editable>
                ))}
              </div>
            </Editable>
          </div>
        </div>
      </section>
    </div>
  );
}

function Editable({
  k,
  onEdit,
  className,
  jobId,
  children,
}: {
  k: CvSectionKey;
  onEdit: (key: CvSectionKey, jobId?: string) => void;
  className?: string;
  jobId?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("cv-editable", className)}
      role="button"
      tabIndex={0}
      aria-label={`Editar sección`}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a")) return;
        if (jobId) e.stopPropagation();
        onEdit(k, jobId);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onEdit(k, jobId);
        }
      }}
    >
      {children}
    </div>
  );
}

function renderRich(text: string): ReactNode[] {
  // Convierte **negrita** y respeta los saltos de línea del bloque editado.
  return text.split("\n").flatMap((line, li) => {
    const nodes: ReactNode[] = [];
    if (li > 0) nodes.push(<br key={`br${li}`} />);
    const parts = line.split(/\*\*(.+?)\*\*/g);
    parts.forEach((part, i) => {
      nodes.push(
        i % 2 === 1 ? (
          <b key={`p${li}_${i}`}>{part}</b>
        ) : (
          <span key={`p${li}_${i}`}>{part}</span>
        ),
      );
    });
    return nodes;
  });
}

export type { Localized };