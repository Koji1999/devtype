const SNIPPETS: Record<string, string[]> = {
  javascript: [
    'expressjs/express/contents/lib/application.js',
    'axios/axios/contents/lib/axios.js',
    'moment/moment/contents/src/moment.js',
  ],
  typescript: [
    'microsoft/typescript/contents/src/compiler/checker.ts',
    'nestjs/nest/contents/packages/core/nest-application.ts',
    'vuejs/core/contents/packages/reactivity/src/reactive.ts',
  ],
  python: [
    'django/django/contents/django/db/models/base.py',
    'pallets/flask/contents/src/flask/app.py',
    'kennethreitz/httpbin/contents/httpbin/core.py',
  ],
  ruby: [
    'rails/rails/contents/activerecord/lib/active_record/base.rb',
    'rails/rails/contents/actionpack/lib/action_controller/base.rb',
    'rails/rails/contents/activesupport/lib/active_support/core_ext/string/inflections.rb',
  ],
  go: [
    'golang/go/contents/src/net/http/server.go',
    'golang/go/contents/src/fmt/print.go',
    'golang/go/contents/src/strings/strings.go',
  ],
  rust: [
    'rust-lang/rust/contents/library/core/src/option.rs',
    'tokio-rs/tokio/contents/tokio/src/runtime/mod.rs',
    'serde-rs/serde/contents/serde/src/lib.rs',
  ],
  java: [
    'spring-projects/spring-framework/contents/spring-core/src/main/java/org/springframework/core/annotation/AnnotationUtils.java',
    'apache/kafka/contents/clients/src/main/java/org/apache/kafka/clients/producer/KafkaProducer.java',
    'google/guava/contents/guava/src/com/google/common/collect/ImmutableList.java',
  ],
  cpp: [
    'opencv/opencv/contents/modules/core/src/matrix.cpp',
    'godotengine/godot/contents/core/math/vector3.cpp',
    'fmtlib/fmt/contents/include/fmt/format.h',
  ],
  swift: [
    'realm/realm-swift/contents/RealmSwift/Realm.swift',
    'apple/swift-algorithms/contents/Sources/Algorithms/Chunked.swift',
    'vapor/vapor/contents/Sources/Vapor/Application.swift',
  ],
  php: [
    'laravel/framework/contents/src/Illuminate/Support/Collection.php',
    'laravel/framework/contents/src/Illuminate/Database/Eloquent/Model.php',
    'symfony/symfony/contents/src/Symfony/Component/HttpFoundation/Request.php',
  ],
  css: [
    'necolas/normalize.css/contents/normalize.css',
    'tailwindlabs/tailwindcss/contents/src/css/preflight.css',
    'twbs/bootstrap/contents/scss/_variables.scss',
  ],
};

const FALLBACK_SNIPPETS: Record<string, string[]> = {
  javascript: [
    `function debounce(func, wait) {\n  let timeout;\n  return function executedFunction(...args) {\n    const later = () => {\n      clearTimeout(timeout);\n      func(...args);\n    };\n    clearTimeout(timeout);\n    timeout = setTimeout(later, wait);\n  };\n}`,
    `function deepClone(obj) {\n  if (obj === null || typeof obj !== 'object') return obj;\n  if (Array.isArray(obj)) return obj.map(deepClone);\n  return Object.fromEntries(\n    Object.entries(obj).map(([k, v]) => [k, deepClone(v)])\n  );\n}`,
    `async function fetchWithRetry(url, retries = 3) {\n  for (let i = 0; i < retries; i++) {\n    try {\n      const response = await fetch(url);\n      if (!response.ok) throw new Error(response.statusText);\n      return await response.json();\n    } catch (err) {\n      if (i === retries - 1) throw err;\n    }\n  }\n}`,
  ],
  typescript: [
    `interface Repository<T> {\n  findById(id: string): Promise<T | null>;\n  findAll(): Promise<T[]>;\n  save(entity: T): Promise<T>;\n  delete(id: string): Promise<void>;\n}`,
    `function groupBy<T, K extends keyof T>(\n  array: T[],\n  key: K\n): Record<string, T[]> {\n  return array.reduce((result, item) => {\n    const group = String(item[key]);\n    return {\n      ...result,\n      [group]: [...(result[group] ?? []), item],\n    };\n  }, {} as Record<string, T[]>);\n}`,
    `type Result<T, E = Error> =\n  | { success: true; data: T }\n  | { success: false; error: E };\n\nfunction tryCatch<T>(fn: () => T): Result<T> {\n  try {\n    return { success: true, data: fn() };\n  } catch (error) {\n    return { success: false, error: error as Error };\n  }\n}`,
  ],
  python: [
    `def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1`,
    `def flatten(lst):\n    result = []\n    for item in lst:\n        if isinstance(item, list):\n            result.extend(flatten(item))\n        else:\n            result.append(item)\n    return result\n\ndef chunk(lst, size):\n    return [lst[i:i+size] for i in range(0, len(lst), size)]`,
    `class Stack:\n    def __init__(self):\n        self._items = []\n\n    def push(self, item):\n        self._items.append(item)\n\n    def pop(self):\n        if self.is_empty():\n            raise IndexError("pop from empty stack")\n        return self._items.pop()\n\n    def peek(self):\n        return self._items[-1]\n\n    def is_empty(self):\n        return len(self._items) == 0`,
  ],
  ruby: [
    `def fibonacci(n)\n  return n if n <= 1\n  a, b = 0, 1\n  (n - 1).times { a, b = b, a + b }\n  b\nend\n\ndef prime?(n)\n  return false if n < 2\n  (2..Math.sqrt(n)).none? { |i| n % i == 0 }\nend`,
    `class LinkedList\n  Node = Struct.new(:value, :next_node)\n\n  def initialize\n    @head = nil\n  end\n\n  def prepend(value)\n    @head = Node.new(value, @head)\n  end\n\n  def to_array\n    result = []\n    current = @head\n    while current\n      result << current.value\n      current = current.next_node\n    end\n    result\n  end\nend`,
    `def deep_merge(base, override)\n  base.merge(override) do |_key, base_val, override_val|\n    if base_val.is_a?(Hash) && override_val.is_a?(Hash)\n      deep_merge(base_val, override_val)\n    else\n      override_val\n    end\n  end\nend`,
  ],
  go: [
    `func binarySearch(arr []int, target int) int {\n  left, right := 0, len(arr)-1\n  for left <= right {\n    mid := (left + right) / 2\n    if arr[mid] == target {\n      return mid\n    } else if arr[mid] < target {\n      left = mid + 1\n    } else {\n      right = mid - 1\n    }\n  }\n  return -1\n}`,
    `func reverseString(s string) string {\n  runes := []rune(s)\n  for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {\n    runes[i], runes[j] = runes[j], runes[i]\n  }\n  return string(runes)\n}\n\nfunc isPalindrome(s string) bool {\n  return s == reverseString(s)\n}`,
    `func mergeSort(arr []int) []int {\n  if len(arr) <= 1 {\n    return arr\n  }\n  mid := len(arr) / 2\n  left := mergeSort(arr[:mid])\n  right := mergeSort(arr[mid:])\n  return merge(left, right)\n}\n\nfunc merge(left, right []int) []int {\n  result := make([]int, 0, len(left)+len(right))\n  i, j := 0, 0\n  for i < len(left) && j < len(right) {\n    if left[i] <= right[j] {\n      result = append(result, left[i])\n      i++\n    } else {\n      result = append(result, right[j])\n      j++\n    }\n  }\n  return append(result, append(left[i:], right[j:]...)...)\n}`,
  ],
  rust: [
    `fn fibonacci(n: u64) -> u64 {\n  match n {\n    0 => 0,\n    1 => 1,\n    _ => {\n      let mut a = 0u64;\n      let mut b = 1u64;\n      for _ in 2..=n {\n        let c = a + b;\n        a = b;\n        b = c;\n      }\n      b\n    }\n  }\n}`,
    `fn bubble_sort(arr: &mut Vec<i32>) {\n  let n = arr.len();\n  for i in 0..n {\n    for j in 0..n - i - 1 {\n      if arr[j] > arr[j + 1] {\n        arr.swap(j, j + 1);\n      }\n    }\n  }\n}`,
    `struct Stack<T> {\n  elements: Vec<T>,\n}\n\nimpl<T> Stack<T> {\n  fn new() -> Self {\n    Stack { elements: Vec::new() }\n  }\n\n  fn push(&mut self, item: T) {\n    self.elements.push(item);\n  }\n\n  fn pop(&mut self) -> Option<T> {\n    self.elements.pop()\n  }\n\n  fn is_empty(&self) -> bool {\n    self.elements.is_empty()\n  }\n}`,
  ],
  java: [
    `public class BinarySearch {\n  public static int search(int[] arr, int target) {\n    int left = 0, right = arr.length - 1;\n    while (left <= right) {\n      int mid = left + (right - left) / 2;\n      if (arr[mid] == target) return mid;\n      if (arr[mid] < target) left = mid + 1;\n      else right = mid - 1;\n    }\n    return -1;\n  }\n}`,
    `public class LinkedList<T> {\n  private Node<T> head;\n\n  private static class Node<T> {\n    T data;\n    Node<T> next;\n    Node(T data) { this.data = data; }\n  }\n\n  public void add(T data) {\n    Node<T> newNode = new Node<>(data);\n    if (head == null) { head = newNode; return; }\n    Node<T> current = head;\n    while (current.next != null) current = current.next;\n    current.next = newNode;\n  }\n}`,
    `public class Stack<T> {\n  private final Deque<T> deque = new ArrayDeque<>();\n\n  public void push(T item) {\n    deque.push(item);\n  }\n\n  public T pop() {\n    if (isEmpty()) throw new EmptyStackException();\n    return deque.pop();\n  }\n\n  public T peek() {\n    return deque.peek();\n  }\n\n  public boolean isEmpty() {\n    return deque.isEmpty();\n  }\n}`,
  ],
  cpp: [
    `int binarySearch(vector<int>& arr, int target) {\n  int left = 0, right = arr.size() - 1;\n  while (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (arr[mid] == target) return mid;\n    if (arr[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
    `void quickSort(vector<int>& arr, int low, int high) {\n  if (low < high) {\n    int pivot = arr[high];\n    int i = low - 1;\n    for (int j = low; j < high; j++) {\n      if (arr[j] <= pivot) {\n        i++;\n        swap(arr[i], arr[j]);\n      }\n    }\n    swap(arr[i + 1], arr[high]);\n    int pi = i + 1;\n    quickSort(arr, low, pi - 1);\n    quickSort(arr, pi + 1, high);\n  }\n}`,
    `template<typename T>\nclass Stack {\nprivate:\n  vector<T> elements;\npublic:\n  void push(T item) {\n    elements.push_back(item);\n  }\n  T pop() {\n    if (elements.empty()) throw runtime_error("Stack is empty");\n    T top = elements.back();\n    elements.pop_back();\n    return top;\n  }\n  bool isEmpty() const {\n    return elements.empty();\n  }\n};`,
  ],
  swift: [
    `func binarySearch<T: Comparable>(_ array: [T], target: T) -> Int? {\n  var left = 0\n  var right = array.count - 1\n  while left <= right {\n    let mid = (left + right) / 2\n    if array[mid] == target { return mid }\n    if array[mid] < target { left = mid + 1 }\n    else { right = mid - 1 }\n  }\n  return nil\n}`,
    `struct Stack<T> {\n  private var elements: [T] = []\n\n  mutating func push(_ element: T) {\n    elements.append(element)\n  }\n\n  mutating func pop() -> T? {\n    return elements.popLast()\n  }\n\n  var top: T? {\n    return elements.last\n  }\n\n  var isEmpty: Bool {\n    return elements.isEmpty\n  }\n}`,
    `func mergeSort<T: Comparable>(_ array: [T]) -> [T] {\n  guard array.count > 1 else { return array }\n  let mid = array.count / 2\n  let left = mergeSort(Array(array[..<mid]))\n  let right = mergeSort(Array(array[mid...]))\n  return merge(left, right)\n}\n\nfunc merge<T: Comparable>(_ left: [T], _ right: [T]) -> [T] {\n  var result: [T] = []\n  var i = 0, j = 0\n  while i < left.count && j < right.count {\n    if left[i] <= right[j] { result.append(left[i]); i++ }\n    else { result.append(right[j]); j++ }\n  }\n  return result + left[i...] + right[j...]\n}`,
  ],
  php: [
    `function binarySearch(array $arr, $target): int {\n  $left = 0;\n  $right = count($arr) - 1;\n  while ($left <= $right) {\n    $mid = intdiv($left + $right, 2);\n    if ($arr[$mid] === $target) return $mid;\n    if ($arr[$mid] < $target) $left = $mid + 1;\n    else $right = $mid - 1;\n  }\n  return -1;\n}`,
    `function flatten(array $array): array {\n  $result = [];\n  array_walk_recursive($array, function($item) use (&$result) {\n    $result[] = $item;\n  });\n  return $result;\n}\n\nfunction groupBy(array $array, callable $key): array {\n  return array_reduce($array, function($carry, $item) use ($key) {\n    $carry[$key($item)][] = $item;\n    return $carry;\n  }, []);\n}`,
    `class Collection {\n  private array $items;\n\n  public function __construct(array $items = []) {\n    $this->items = $items;\n  }\n\n  public function filter(callable $callback): self {\n    return new self(array_values(array_filter($this->items, $callback)));\n  }\n\n  public function map(callable $callback): self {\n    return new self(array_map($callback, $this->items));\n  }\n\n  public function count(): int {\n    return count($this->items);\n  }\n}`,
  ],
  css: [
    `* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: system-ui, -apple-system, sans-serif;\n  line-height: 1.5;\n  color: #333;\n}\n\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 1rem;\n}`,
    `.card {\n  background: white;\n  border-radius: 8px;\n  padding: 1.5rem;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n  transition: transform 0.2s ease;\n}\n\n.card:hover {\n  transform: translateY(-2px);\n}\n\n.card-title {\n  font-size: 1.25rem;\n  font-weight: 600;\n  margin-bottom: 0.5rem;\n}`,
    `.flex-center {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.grid-auto {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 1rem;\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}`,
  ],
};

const KEYWORDS = [
  'function', 'const', 'class', 'export', 'def', 'import',
  'if', 'for', 'func', 'fn ', 'pub ', 'void', 'int ', 'var ',
  'struct', 'impl', 'type', 'interface', 'switch', 'while',
];

function getRandomFallback(language: string): string {
  const snippets = FALLBACK_SNIPPETS[language] ?? FALLBACK_SNIPPETS['javascript'];
  return snippets[Math.floor(Math.random() * snippets.length)];
}

function extractSnippet(code: string): string {
  const lines = code.split('\n');
  const commentPatterns = ['/**', '/*', ' *', '*/', '//!', '//'];

  const logicalLines = lines.reduce<number[]>((acc, line, index) => {
    const trimmed = line.trim();
    const startsAtColumnZero = line.length > 0 && line[0] !== ' ' && line[0] !== '\t';
    const isNotComment = !commentPatterns.some(p => trimmed.startsWith(p)) &&
      !trimmed.startsWith('#') &&
      !trimmed.startsWith('"""') &&
      !trimmed.startsWith("'''");
    const hasKeyword = KEYWORDS.some(kw => trimmed.startsWith(kw));

    if (startsAtColumnZero && isNotComment && hasKeyword) {
      const slice = lines.slice(index, index + 20);
      const commentCount = slice.filter(l =>
        commentPatterns.some(p => l.trim().startsWith(p))
      ).length;

      if (commentCount <= 3) {
        acc.push(index);
      }
    }
    return acc;
  }, []);

  if (logicalLines.length === 0) return getRandomFallback('javascript');

  const startIndex = logicalLines[Math.floor(Math.random() * logicalLines.length)];
  return lines.slice(startIndex, startIndex + 20).join('\n');
}

export async function fetchSnippet(language: string): Promise<string> {
  const paths = SNIPPETS[language];
  if (!paths) return getRandomFallback(language);

  const path = paths[Math.floor(Math.random() * paths.length)];

  try {
    const response = await fetch(`https://api.github.com/repos/${path}`);
    if (!response.ok) return getRandomFallback(language);

    const data = await response.json();
    if (!data.content) return getRandomFallback(language);

    const code = atob(data.content.replace(/\n/g, ''));
    return extractSnippet(code);
  } catch {
    return getRandomFallback(language);
  }
}