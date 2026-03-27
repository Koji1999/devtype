// const SNIPPETS: Record<string, string[]> = {
//   javascript: [
//     'expressjs/express/contents/lib/application.js',
//     'axios/axios/contents/lib/axios.js',
//     'moment/moment/contents/src/moment.js',
//   ],
//   typescript: [
//     'microsoft/typescript/contents/src/compiler/checker.ts',
//     'nestjs/nest/contents/packages/core/nest-application.ts',
//     'vuejs/core/contents/packages/reactivity/src/reactive.ts',
//   ],
//   python: [
//     'django/django/contents/django/db/models/base.py',
//     'pallets/flask/contents/src/flask/app.py',
//     'kennethreitz/httpbin/contents/httpbin/core.py',
//   ],
//   ruby: [
//     'rails/rails/contents/activerecord/lib/active_record/base.rb',
//     'rails/rails/contents/actionpack/lib/action_controller/base.rb',
//     'rails/rails/contents/activesupport/lib/active_support/core_ext/string/inflections.rb',
//   ],
//   go: [
//     'golang/go/contents/src/net/http/server.go',
//     'golang/go/contents/src/fmt/print.go',
//     'golang/go/contents/src/strings/strings.go',
//   ],
//   rust: [
//     'rust-lang/rust/contents/library/core/src/option.rs',
//     'tokio-rs/tokio/contents/tokio/src/runtime/mod.rs',
//     'serde-rs/serde/contents/serde/src/lib.rs',
//   ],
//   java: [
//     'spring-projects/spring-framework/contents/spring-core/src/main/java/org/springframework/core/annotation/AnnotationUtils.java',
//     'apache/kafka/contents/clients/src/main/java/org/apache/kafka/clients/producer/KafkaProducer.java',
//     'google/guava/contents/guava/src/com/google/common/collect/ImmutableList.java',
//   ],
//   cpp: [
//     'opencv/opencv/contents/modules/core/src/matrix.cpp',
//     'godotengine/godot/contents/core/math/vector3.cpp',
//     'fmtlib/fmt/contents/include/fmt/format.h',
//   ],
//   swift: [
//     'realm/realm-swift/contents/RealmSwift/Realm.swift',
//     'apple/swift-algorithms/contents/Sources/Algorithms/Chunked.swift',
//     'vapor/vapor/contents/Sources/Vapor/Application.swift',
//   ],
//   php: [
//     'laravel/framework/contents/src/Illuminate/Support/Collection.php',
//     'laravel/framework/contents/src/Illuminate/Database/Eloquent/Model.php',
//     'symfony/symfony/contents/src/Symfony/Component/HttpFoundation/Request.php',
//   ],
//   css: [
//     'necolas/normalize.css/contents/normalize.css',
//     'tailwindlabs/tailwindcss/contents/src/css/preflight.css',
//     'twbs/bootstrap/contents/scss/_variables.scss',
//   ],
// }

// const KEYWORDS = [
//   'function', 'const', 'class', 'export', 'def', 'import',
//   'if', 'for', 'func', 'fn ', 'pub ', 'void', 'int ', 'var ',
//   'struct', 'impl', 'type', 'interface', 'switch', 'while',
// ];

// export async function fetchSnippet(language: string): Promise<string> {
//   const paths = SNIPPETS[language];
//   const path = paths[Math.floor(Math.random() * paths.length)];
//   const response = await fetch(`https://api.github.com/repos/${path}`);
//   const data = await response.json();

//   if (!data.content) {
//     return `Could not load ${language} snippet. GitHub API may be rate limited.\n Please try again in a moment.`;
//   }

//   const code = atob(data.content.replace(/\n/g, ""));
//   const lines = code.split("\n");
//   const logicalLines = lines.reduce<number[]>((acc, line, index) => {
//     const trimmed = line.trim();
//     if (KEYWORDS.some(kw => trimmed.startsWith(kw))) {
//       acc.push(index);
//     }
//     return acc;
//   }, []);

//   if (logicalLines.length === 0) {
//     return lines.slice(0, 20).join('\n');
//   }

//   const startIndex = logicalLines[Math.floor(Math.random() * logicalLines.length)];
//   const snippet = lines.slice(startIndex, startIndex + 20).join('\n');
//   return snippet;
// }

const TEST_SNIPPETS: Record<string, string> = {
  javascript: `function add(a, b) {\n  return a + b;\n}\n\nconst multiply = (x, y) => {\n  return x * y;\n};\n\nfunction greet(name) {\n  const message = 'Hello, ' + name;\n  console.log(message);\n  return message;\n}`,
  typescript: `interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\nfunction getUser(id: number): User {\n  return { id, name: 'John', email: 'john@example.com' };\n}\n\nconst formatUser = (user: User): string => {\n  return \`\${user.name} <\${user.email}>\`;\n};`,
  python: `def add(a, b):\n    return a + b\n\ndef greet(name):\n    message = f'Hello, {name}'\n    print(message)\n    return message\n\nclass Calculator:\n    def __init__(self):\n        self.result = 0`,
}

export async function fetchSnippet(language: string): Promise<string> {
  return TEST_SNIPPETS[language] ?? TEST_SNIPPETS['javascript'];
}