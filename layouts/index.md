# {{ .Title }}

{{ .Description }}

{{ .Params.status }}

{{ .RawContent }}

---
[HTML]({{ .Permalink }}) · [Source](https://github.com/madd-sh/madd-sh.github.io/blob/{{ .Site.Params.sourceRevision }}/content/{{ .Lang }}/{{ .File.LogicalName }})
{{ range .Translations }}[{{ .Language.LanguageName }}]({{ (.OutputFormats.Get "MD").Permalink }})
{{ end }}
