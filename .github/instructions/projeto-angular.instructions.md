---
description: Esta instrução deve ser carregada ao criar um novo componente angular, ou ao editar um componente existente.
applyTo: **/*.component.ts
---

<!-- Tip: Use /create-instructions in chat to generate content with agent assistance -->

# ESCOPO TECNOLOGICO
Framework: Angular 22
HTML 5
Estilos: Apenas CSS (não Sass, less)

# ESTRUTURA DE COMPONENTES ANGULAR
src/app
   common - componentes reutilizaveis
   pages - funcionalidades
      <funcionalidade> - nome da funcionalidade
        model
        services
        routes
        componentes

# ESCOLHAS TECNICAS
## Camada de serviço
  Chamadas de endpoints
  Regras de negocios/interação de uso comum da funcionalidade
  Deve usar http client nativo do angular

## Componente
  Usar reactive forms
  Usar signals 

# HTML
  Usar html e css externos ao typescript
  Usar componentes do material design
  Quando o material design tiver um componente, evitar a criação de componentes em html puro.
  