# {{ .Title }}

{{ with .Description }}{{ . }}{{ end }}

{{ .RawContent }}

---

{{ if .Translations }}
## Other Languages

{{ range .Translations }}
- [{{ .Language.LanguageName }}]({{ .Permalink | replaceRE "index\\.html$" "index.md" }})
{{ end }}
{{ end }}

---
*MADD — Multi-Agent Driven Development*
*[View HTML version]({{ .Permalink }})*
