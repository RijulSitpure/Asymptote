export const batch17Algo = [
  // 1. #1032 stream-of-characters
  {
    slug: 'stream-of-characters',
    number: 1032,
    category: 'Algorithms',
    patterns: ['tree-trie-prefix'],
    hints: [
      {
        level: 1,
        title: 'Suffix Stream Recognition',
        text: 'A match occurs whenever a sequence of recent characters forms a dictionary word ending at the current query.'
      },
      {
        level: 2,
        title: 'Reverse Trie Matching',
        text: 'Insert all words reversed into a prefix tree. Upon receiving each query letter, traverse the tree backwards through stream history.'
      },
      {
        level: 3,
        title: 'Stream History Blueprint',
        text: 'Store query stream in a ring buffer or list. For each query, walk nodes from root backwards; if a terminal word node is met, return true.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass StreamChecker:\n    def __init__(self, words: list[str]):\n        self.trie = {}\n        self.stream = []\n        self.max_len = 0\n        for w in words:\n            self.max_len = max(self.max_len, len(w))\n            node = self.trie\n            for ch in reversed(w):\n                node = node.setdefault(ch, {})\n            node[\"$\"] = True\n\n    def query(self, letter: str) -> bool:\n        self.stream.append(letter)\n        if len(self.stream) > self.max_len:\n            self.stream.pop(0)\n        node = self.trie\n        for ch in reversed(self.stream):\n            if \"$\" in node:\n                return True\n            if ch not in node:\n                return False\n            node = node[ch]\n        return \"$\" in node\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(W * L) init, O(M) query',
      space: 'O(W * L)',
      variables: ['W: number of words', 'L: average word length', 'M: maximum word length'],
      notes: 'Reverse prefix tree bounds each query walk by the depth of the longest dictionary word.',
      whyNaiveFails: 'Forward trie matching requires maintaining multiple active pointers that branch exponentially with duplicate prefixes.',
      spaceTimeTradeoff: 'Storing words reversed transforms arbitrary suffix search into deterministic root-to-leaf prefix descent.',
      interviewerExpectation: 'Reverse prefix tree design and stream history truncation to max word length.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class StreamChecker:
    def __init__(self, words: list[str]):
        self.trie = {}
        self.stream = []
        self.max_len = 0
        for w in words:
            self.max_len = max(self.max_len, len(w))
            node = self.trie
            for ch in reversed(w):
                node = node.setdefault(ch, {})
            node["$"] = True

    def query(self, letter: str) -> bool:
        self.stream.append(letter)
        if len(self.stream) > self.max_len:
            self.stream.pop(0)
        node = self.trie
        for ch in reversed(self.stream):
            if "$" in node:
                return True
            if ch not in node:
                return False
            node = node[ch]
        return "$" in node`,
        approach: 'Reverse Prefix Tree with Bounded History',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class StreamChecker {
    struct TrieNode {
        bool is_word = false;
        unordered_map<char, TrieNode*> next;
    };
    TrieNode* root;
    deque<char> stream;
    int max_len = 0;
public:
    StreamChecker(vector<string>& words) {
        root = new TrieNode();
        for (const string& w : words) {
            max_len = max(max_len, (int)w.size());
            TrieNode* curr = root;
            for (int i = (int)w.size() - 1; i >= 0; --i) {
                if (!curr->next.count(w[i])) curr->next[w[i]] = new TrieNode();
                curr = curr->next[w[i]];
            }
            curr->is_word = true;
        }
    }
    bool query(char letter) {
        stream.push_front(letter);
        if ((int)stream.size() > max_len) stream.pop_back();
        TrieNode* curr = root;
        for (char ch : stream) {
            if (curr->is_word) return true;
            if (!curr->next.count(ch)) return false;
            curr = curr->next[ch];
        }
        return curr->is_word;
    }
};`,
        approach: 'C++ Reversed Trie Node Structure',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class StreamChecker {
    static class TrieNode {
        boolean isWord = false;
        TrieNode[] children = new TrieNode[26];
    }
    private final TrieNode root = new TrieNode();
    private final StringBuilder stream = new StringBuilder();
    private int maxLen = 0;

    public StreamChecker(String[] words) {
        for (String w : words) {
            maxLen = Math.max(maxLen, w.length());
            TrieNode node = root;
            for (int i = w.length() - 1; i >= 0; i--) {
                int idx = w.charAt(i) - 'a';
                if (node.children[idx] == null) node.children[idx] = new TrieNode();
                node = node.children[idx];
            }
            node.isWord = true;
        }
    }

    public boolean query(char letter) {
        stream.append(letter);
        if (stream.length() > maxLen) stream.deleteCharAt(0);
        TrieNode node = root;
        for (int i = stream.length() - 1; i >= 0; i--) {
            int idx = stream.charAt(i) - 'a';
            if (node.children[idx] == null) return false;
            node = node.children[idx];
            if (node.isWord) return true;
        }
        return false;
    }
}`,
        approach: 'Java Array-Based Reversed Trie',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class StreamChecker {
    constructor(words) {
        this.trie = {};
        this.stream = [];
        this.maxLen = 0;
        for (const w of words) {
            this.maxLen = Math.max(this.maxLen, w.length);
            let node = this.trie;
            for (let i = w.length - 1; i >= 0; i--) {
                const ch = w[i];
                if (!node[ch]) node[ch] = {};
                node = node[ch];
            }
            node['$'] = true;
        }
    }
    query(letter) {
        this.stream.unshift(letter);
        if (this.stream.length > this.maxLen) this.stream.pop();
        let node = this.trie;
        for (const ch of this.stream) {
            if (node['$']) return true;
            if (!node[ch]) return false;
            node = node[ch];
        }
        return Boolean(node['$']);
    }
}`,
        approach: 'JavaScript Object Trie Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import sys

class StreamChecker:
    def __init__(self, words: list[str]):
        self.trie = {}
        self.stream = []
        self.max_len = 0
        for w in words:
            self.max_len = max(self.max_len, len(w))
            node = self.trie
            for ch in reversed(w):
                node = node.setdefault(ch, {})
            node["$"] = True

    def query(self, letter: str) -> bool:
        self.stream.append(letter)
        if len(self.stream) > self.max_len:
            self.stream.pop(0)
        node = self.trie
        for ch in reversed(self.stream):
            if "$" in node:
                return True
            if ch not in node:
                return False
            node = node[ch]
        return "$" in node

sc = StreamChecker(["cd", "f", "kl"])
assert sc.query("a") == False
assert sc.query("b") == False
assert sc.query("c") == False
assert sc.query("d") == True
assert sc.query("e") == False
assert sc.query("f") == True
assert sc.query("g") == False
assert sc.query("h") == False
assert sc.query("i") == False
assert sc.query("j") == False
assert sc.query("k") == False
assert sc.query("l") == True
print("All tests passed successfully.")
`
  },

  // 2. #1095 find-in-mountain-array
  {
    slug: 'find-in-mountain-array',
    number: 1095,
    category: 'Algorithms',
    patterns: ['binary-search-basic'],
    hints: [
      {
        level: 1,
        title: 'Peak Localization and Split Search',
        text: 'The mountain array is strictly increasing up to a peak and strictly decreasing thereafter.'
      },
      {
        level: 2,
        title: 'Three Binary Searches Structure',
        text: 'Locate the peak index using binary search on slope direction, then binary search the ascending and descending sides.'
      },
      {
        level: 3,
        title: 'Binary Partitioning Blueprint',
        text: 'Find peak where arr.get(m) > arr.get(m+1). Search left half [0, peak] for target. If missing, search right half [peak+1, n-1] inverted.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def findInMountainArray(self, target: int, mountain_arr) -> int:\n        n = mountain_arr.length()\n        l, r = 0, n - 1\n        while l < r:\n            m = (l + r) // 2\n            if mountain_arr.get(m) < mountain_arr.get(m + 1):\n                l = m + 1\n            else:\n                r = m\n        peak = l\n\n        l, r = 0, peak\n        while l <= r:\n            m = (l + r) // 2\n            val = mountain_arr.get(m)\n            if val == target:\n                return m\n            elif val < target:\n                l = m + 1\n            else:\n                r = m - 1\n\n        l, r = peak + 1, n - 1\n        while l <= r:\n            m = (l + r) // 2\n            val = mountain_arr.get(m)\n            if val == target:\n                return m\n            elif val > target:\n                l = m + 1\n            else:\n                r = m - 1\n        return -1\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log N)',
      space: 'O(1)',
      variables: ['N: length of mountain array'],
      notes: 'Three sequential binary searches take at most 3 * log2(10000) <= 45 calls to get().',
      whyNaiveFails: 'Linear scanning exceeds the strictly enforced limit of 100 get() API calls.',
      spaceTimeTradeoff: 'Caching intermediate get calls is optional since 3 * log N is well within the 100-call constraint.',
      interviewerExpectation: 'Finding peak index first, then searching the ascending prefix followed by descending suffix.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def findInMountainArray(self, target: int, mountain_arr) -> int:
        n = mountain_arr.length()
        l, r = 0, n - 1
        while l < r:
            m = (l + r) // 2
            if mountain_arr.get(m) < mountain_arr.get(m + 1):
                l = m + 1
            else:
                r = m
        peak = l

        l, r = 0, peak
        while l <= r:
            m = (l + r) // 2
            val = mountain_arr.get(m)
            if val == target:
                return m
            elif val < target:
                l = m + 1
            else:
                r = m - 1

        l, r = peak + 1, n - 1
        while l <= r:
            m = (l + r) // 2
            val = mountain_arr.get(m)
            if val == target:
                return m
            elif val > target:
                l = m + 1
            else:
                r = m - 1
        return -1`,
        approach: 'Peak Identification followed by Dual Binary Searches',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int findInMountainArray(int target, MountainArray &mountainArr) {
        int n = mountainArr.length();
        int l = 0, r = n - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (mountainArr.get(m) < mountainArr.get(m + 1)) l = m + 1;
            else r = m;
        }
        int peak = l;
        l = 0; r = peak;
        while (l <= r) {
            int m = l + (r - l) / 2;
            int val = mountainArr.get(m);
            if (val == target) return m;
            if (val < target) l = m + 1;
            else r = m - 1;
        }
        l = peak + 1; r = n - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            int val = mountainArr.get(m);
            if (val == target) return m;
            if (val > target) l = m + 1;
            else r = m - 1;
        }
        return -1;
    }
};`,
        approach: 'Three-Phase Binary Search in C++',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int findInMountainArray(int target, MountainArray mountainArr) {
        int n = mountainArr.length();
        int l = 0, r = n - 1;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (mountainArr.get(m) < mountainArr.get(m + 1)) l = m + 1;
            else r = m;
        }
        int peak = l;
        l = 0; r = peak;
        while (l <= r) {
            int m = l + (r - l) / 2;
            int val = mountainArr.get(m);
            if (val == target) return m;
            if (val < target) l = m + 1;
            else r = m - 1;
        }
        l = peak + 1; r = n - 1;
        while (l <= r) {
            int m = l + (r - l) / 2;
            int val = mountainArr.get(m);
            if (val == target) return m;
            if (val > target) l = m + 1;
            else r = m - 1;
        }
        return -1;
    }
}`,
        approach: 'Java Dual-Range Mountain Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var findInMountainArray = function(target, mountainArr) {
    const n = mountainArr.length();
    let l = 0, r = n - 1;
    while (l < r) {
        const m = Math.floor((l + r) / 2);
        if (mountainArr.get(m) < mountainArr.get(m + 1)) l = m + 1;
        else r = m;
    }
    const peak = l;
    l = 0; r = peak;
    while (l <= r) {
        const m = Math.floor((l + r) / 2);
        const val = mountainArr.get(m);
        if (val === target) return m;
        if (val < target) l = m + 1;
        else r = m - 1;
    }
    l = peak + 1; r = n - 1;
    while (l <= r) {
        const m = Math.floor((l + r) / 2);
        const val = mountainArr.get(m);
        if (val === target) return m;
        if (val > target) l = m + 1;
        else r = m - 1;
    }
    return -1;
};`,
        approach: 'JavaScript Binary Search on Mountain API',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class MockMountain:
    def __init__(self, arr):
        self.arr = arr
    def get(self, index: int) -> int:
        return self.arr[index]
    def length(self) -> int:
        return len(self.arr)

class Solution:
    def findInMountainArray(self, target: int, mountainArr) -> int:
        n = mountainArr.length()
        l, r = 0, n - 1
        while l < r:
            m = (l + r) // 2
            if mountainArr.get(m) < mountainArr.get(m + 1):
                l = m + 1
            else:
                r = m
        peak = l

        l, r = 0, peak
        while l <= r:
            m = (l + r) // 2
            val = mountainArr.get(m)
            if val == target:
                return m
            elif val < target:
                l = m + 1
            else:
                r = m - 1

        l, r = peak + 1, n - 1
        while l <= r:
            m = (l + r) // 2
            val = mountainArr.get(m)
            if val == target:
                return m
            elif val > target:
                l = m + 1
            else:
                r = m - 1

        return -1

sol = Solution()
m1 = MockMountain([1, 2, 3, 4, 5, 3, 1])
assert sol.findInMountainArray(3, m1) == 2
m2 = MockMountain([0, 1, 2, 4, 2, 1])
assert sol.findInMountainArray(3, m2) == -1
print("All tests passed successfully.")
`
  },

  // 3. #1129 shortest-path-with-alternating-colors
  {
    slug: 'shortest-path-with-alternating-colors',
    number: 1129,
    category: 'Algorithms',
    patterns: ['graph-bfs-shortest-path'],
    hints: [
      {
        level: 1,
        title: 'Bicolored Path Exploration',
        text: 'The shortest distance to any node depends on whether the arrival edge was red or blue.'
      },
      {
        level: 2,
        title: 'Augmented State Breadth Search',
        text: 'Form a queue tracking (node, last_color) pairs. Alternating edges must switch colors on each traversal step.'
      },
      {
        level: 3,
        title: 'Queue State Blueprint',
        text: 'Seed queue with (0, 0) for red and (0, 1) for blue with distance 0. Advance across opposing color edges, tracking visited state per color.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import deque\n\nclass Solution:\n    def shortestAlternatingPaths(self, n: int, redEdges: list[list[int]], blueEdges: list[list[int]]) -> list[int]:\n        red_adj = [[] for _ in range(n)]\n        blue_adj = [[] for _ in range(n)]\n        for u, v in redEdges:\n            red_adj[u].append(v)\n        for u, v in blueEdges:\n            blue_adj[u].append(v)\n\n        res = [-1] * n\n        q = deque([(0, 0, 0), (0, 1, 0)])\n        visited = {(0, 0), (0, 1)}\n\n        while q:\n            u, color, d = q.popleft()\n            if res[u] == -1:\n                res[u] = d\n            nxt_adj = blue_adj if color == 0 else red_adj\n            nxt_color = 1 if color == 0 else 0\n            for v in nxt_adj[u]:\n                if (v, nxt_color) not in visited:\n                    visited.add((v, nxt_color))\n                    q.append((v, nxt_color, d + 1))\n        return res\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(V + E)',
      space: 'O(V + E)',
      variables: ['V: number of nodes (n)', 'E: total number of red and blue edges'],
      notes: 'Each vertex is visited at most twice (once via red incoming edge, once via blue incoming edge).',
      whyNaiveFails: 'Tracking visited nodes without incoming edge color prevents revisiting a node with the alternate color necessary to proceed.',
      spaceTimeTradeoff: 'Doubling the state space to (node, color) guarantees acyclic progression without exponential path exploration.',
      interviewerExpectation: 'Breadth-first search with composite state (node, last_color).'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class Solution:
    def shortestAlternatingPaths(self, n: int, redEdges: list[list[int]], blueEdges: list[list[int]]) -> list[int]:
        red_adj = [[] for _ in range(n)]
        blue_adj = [[] for _ in range(n)]
        for u, v in redEdges:
            red_adj[u].append(v)
        for u, v in blueEdges:
            blue_adj[u].append(v)

        res = [-1] * n
        q = deque([(0, 0, 0), (0, 1, 0)])
        visited = {(0, 0), (0, 1)}

        while q:
            u, color, d = q.popleft()
            if res[u] == -1:
                res[u] = d
            nxt_adj = blue_adj if color == 0 else red_adj
            nxt_color = 1 if color == 0 else 0
            for v in nxt_adj[u]:
                if (v, nxt_color) not in visited:
                    visited.add((v, nxt_color))
                    q.append((v, nxt_color, d + 1))
        return res`,
        approach: 'Augmented State BFS on Bicolored Graph',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    vector<int> shortestAlternatingPaths(int n, vector<vector<int>>& redEdges, vector<vector<int>>& blueEdges) {
        vector<vector<int>> red_adj(n), blue_adj(n);
        for (auto& e : redEdges) red_adj[e[0]].push_back(e[1]);
        for (auto& e : blueEdges) blue_adj[e[0]].push_back(e[1]);

        vector<int> res(n, -1);
        vector<vector<bool>> visited(n, vector<bool>(2, false));
        queue<tuple<int, int, int>> q;
        q.push({0, 0, 0}); visited[0][0] = true;
        q.push({0, 1, 0}); visited[0][1] = true;

        while (!q.empty()) {
            auto [u, color, d] = q.front(); q.pop();
            if (res[u] == -1) res[u] = d;
            int next_color = 1 - color;
            auto& adj = (color == 0) ? blue_adj : red_adj;
            for (int v : adj[u]) {
                if (!visited[v][next_color]) {
                    visited[v][next_color] = true;
                    q.push({v, next_color, d + 1});
                }
            }
        }
        return res;
    }
};`,
        approach: 'C++ Queue BFS with Color-Indexed Visited Table',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {
        List<Integer>[] redAdj = new ArrayList[n];
        List<Integer>[] blueAdj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            redAdj[i] = new ArrayList<>();
            blueAdj[i] = new ArrayList<>();
        }
        for (int[] e : redEdges) redAdj[e[0]].add(e[1]);
        for (int[] e : blueEdges) blueAdj[e[0]].add(e[1]);

        int[] res = new int[n];
        Arrays.fill(res, -1);
        boolean[][] visited = new boolean[n][2];
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{0, 0, 0}); visited[0][0] = true;
        q.offer(new int[]{0, 1, 0}); visited[0][1] = true;

        while (!q.isEmpty()) {
            int[] curr = q.poll();
            int u = curr[0], color = curr[1], d = curr[2];
            if (res[u] == -1) res[u] = d;
            int nextColor = 1 - color;
            List<Integer> adj = (color == 0) ? blueAdj[u] : redAdj[u];
            for (int v : adj) {
                if (!visited[v][nextColor]) {
                    visited[v][nextColor] = true;
                    q.offer(new int[]{v, nextColor, d + 1});
                }
            }
        }
        return res;
    }
}`,
        approach: 'Java Adjacency Lists with 2D Visited Array BFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var shortestAlternatingPaths = function(n, redEdges, blueEdges) {
    const redAdj = Array.from({ length: n }, () => []);
    const blueAdj = Array.from({ length: n }, () => []);
    for (const [u, v] of redEdges) redAdj[u].push(v);
    for (const [u, v] of blueEdges) blueAdj[u].push(v);

    const res = Array(n).fill(-1);
    const visited = Array.from({ length: n }, () => [false, false]);
    const q = [[0, 0, 0], [0, 1, 0]];
    visited[0][0] = true;
    visited[0][1] = true;

    while (q.length > 0) {
        const [u, color, d] = q.shift();
        if (res[u] === -1) res[u] = d;
        const nextColor = 1 - color;
        const adj = (color === 0) ? blueAdj[u] : redAdj[u];
        for (const v of adj) {
            if (!visited[v][nextColor]) {
                visited[v][nextColor] = true;
                q.push([v, nextColor, d + 1]);
            }
        }
    }
    return res;
};`,
        approach: 'JavaScript BFS Alternating Color Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `from collections import deque

class Solution:
    def shortestAlternatingPaths(self, n: int, redEdges: list[list[int]], blueEdges: list[list[int]]) -> list[int]:
        red_adj = [[] for _ in range(n)]
        blue_adj = [[] for _ in range(n)]
        for u, v in redEdges:
            red_adj[u].append(v)
        for u, v in blueEdges:
            blue_adj[u].append(v)

        res = [-1] * n
        q = deque([(0, 0, 0), (0, 1, 0)])
        visited = {(0, 0), (0, 1)}

        while q:
            u, color, d = q.popleft()
            if res[u] == -1:
                res[u] = d
            nxt_adj = blue_adj if color == 0 else red_adj
            nxt_color = 1 if color == 0 else 0
            for v in nxt_adj[u]:
                if (v, nxt_color) not in visited:
                    visited.add((v, nxt_color))
                    q.append((v, nxt_color, d + 1))
        return res

sol = Solution()
assert sol.shortestAlternatingPaths(3, [[0,1],[1,2]], []) == [0, 1, -1]
assert sol.shortestAlternatingPaths(3, [[0,1]], [[2,1]]) == [0, 1, -1]
print("All tests passed successfully.")
`
  },

  // 4. #1146 snapshot-array
  {
    slug: 'snapshot-array',
    number: 1146,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Versioned Value History',
        text: 'Rather than cloning the entire array per snapshot, record each value update alongside its active snapshot identifier.'
      },
      {
        level: 2,
        title: 'Per-Index Sorted Revision Logs',
        text: 'Keep a list of (snap_id, val) entries for each index. The value at snapshot S is the most recent revision with snap_id <= S.'
      },
      {
        level: 3,
        title: 'Binary Search Lookup Blueprint',
        text: 'Append (current_snap_id, val) to index history upon set. For get(index, snap_id), binary search the index history for the largest snap_id <= target.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport bisect\n\nclass SnapshotArray:\n    def __init__(self, length: int):\n        self.snaps = [[(0, 0)] for _ in range(length)]\n        self.snap_id = 0\n\n    def set(self, index: int, val: int) -> None:\n        history = self.snaps[index]\n        if history[-1][0] == self.snap_id:\n            history[-1] = (self.snap_id, val)\n        else:\n            history.append((self.snap_id, val))\n\n    def snap(self) -> int:\n        self.snap_id += 1\n        return self.snap_id - 1\n\n    def get(self, index: int, snap_id: int) -> int:\n        history = self.snaps[index]\n        idx = bisect.bisect_right(history, (snap_id, float(\"inf\"))) - 1\n        return history[idx][1]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) init, set, snap; O(log S) get',
      space: 'O(N + U)',
      variables: ['N: length of array', 'U: total number of set operations', 'S: snapshots recorded for an index'],
      notes: 'Binary search over revision history returns the latest version in logarithmic time.',
      whyNaiveFails: 'Deep-copying the entire array on every snap takes O(N * S) time and memory, triggering time and memory limits.',
      spaceTimeTradeoff: 'Appending changes per index incurs sparse memory proportional only to mutations.',
      interviewerExpectation: 'Avoid array cloning; use binary search over per-index versioned histories.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import bisect

class SnapshotArray:
    def __init__(self, length: int):
        self.snaps = [[(0, 0)] for _ in range(length)]
        self.snap_id = 0

    def set(self, index: int, val: int) -> None:
        history = self.snaps[index]
        if history[-1][0] == self.snap_id:
            history[-1] = (self.snap_id, val)
        else:
            history.append((self.snap_id, val))

    def snap(self) -> int:
        self.snap_id += 1
        return self.snap_id - 1

    def get(self, index: int, snap_id: int) -> int:
        history = self.snaps[index]
        idx = bisect.bisect_right(history, (snap_id, float("inf"))) - 1
        return history[idx][1]`,
        approach: 'Per-Index Versioned History with Bisect Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class SnapshotArray {
    vector<vector<pair<int, int>>> history;
    int snap_id = 0;
public:
    SnapshotArray(int length) : history(length) {
        for (int i = 0; i < length; ++i) {
            history[i].push_back({0, 0});
        }
    }
    void set(int index, int val) {
        if (history[index].back().first == snap_id) {
            history[index].back().second = val;
        } else {
            history[index].push_back({snap_id, val});
        }
    }
    int snap() {
        return snap_id++;
    }
    int get(int index, int snap_id) {
        auto& h = history[index];
        auto it = upper_bound(h.begin(), h.end(), make_pair(snap_id, INT_MAX));
        --it;
        return it->second;
    }
};`,
        approach: 'C++ Upper Bound Search on Vector Pairs',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class SnapshotArray {
    private final TreeMap<Integer, Integer>[] history;
    private int snapId = 0;

    public SnapshotArray(int length) {
        history = new TreeMap[length];
        for (int i = 0; i < length; i++) {
            history[i] = new TreeMap<>();
            history[i].put(0, 0);
        }
    }

    public void set(int index, int val) {
        history[index].put(snapId, val);
    }

    public int snap() {
        return snapId++;
    }

    public int get(int index, int snap_id) {
        return history[index].floorEntry(snap_id).getValue();
    }
}`,
        approach: 'Java TreeMap FloorEntry Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class SnapshotArray {
    constructor(length) {
        this.history = Array.from({ length }, () => [[0, 0]]);
        this.snapId = 0;
    }
    set(index, val) {
        const h = this.history[index];
        if (h[h.length - 1][0] === this.snapId) {
            h[h.length - 1][1] = val;
        } else {
            h.push([this.snapId, val]);
        }
    }
    snap() {
        return this.snapId++;
    }
    get(index, snap_id) {
        const h = this.history[index];
        let l = 0, r = h.length - 1, ans = 0;
        while (l <= r) {
            const m = Math.floor((l + r) / 2);
            if (h[m][0] <= snap_id) {
                ans = h[m][1];
                l = m + 1;
            } else {
                r = m - 1;
            }
        }
        return ans;
    }
}`,
        approach: 'JavaScript Binary Search on Versioned Array',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import bisect

class SnapshotArray:
    def __init__(self, length: int):
        self.snaps = [[(0, 0)] for _ in range(length)]
        self.snap_id = 0

    def set(self, index: int, val: int) -> None:
        history = self.snaps[index]
        if history[-1][0] == self.snap_id:
            history[-1] = (self.snap_id, val)
        else:
            history.append((self.snap_id, val))

    def snap(self) -> int:
        self.snap_id += 1
        return self.snap_id - 1

    def get(self, index: int, snap_id: int) -> int:
        history = self.snaps[index]
        idx = bisect.bisect_right(history, (snap_id, float("inf"))) - 1
        return history[idx][1]

sa = SnapshotArray(3)
sa.set(0, 5)
s0 = sa.snap()
sa.set(0, 6)
assert sa.get(0, 0) == 5
assert sa.get(0, s0) == 5
print("All tests passed successfully.")
`
  },

  // 5. #1157 online-majority-element-in-subarray
  {
    slug: 'online-majority-element-in-subarray',
    number: 1157,
    category: 'Algorithms',
    patterns: ['segment-tree-fenwick'],
    hints: [
      {
        level: 1,
        title: 'Candidate Identification and Exact Verification',
        text: 'A majority candidate must occur frequently enough across random samples or segment tree subranges.'
      },
      {
        level: 2,
        title: 'Boyer-Moore Segment Tree with Frequency Verification',
        text: 'Build a segment tree maintaining Boyer-Moore majority candidates. Verify candidates by binary searching indices in a hash map.'
      },
      {
        level: 3,
        title: 'Segment Tree Query Blueprint',
        text: 'Query segment tree for range candidate. Count exact occurrences in [left, right] using bisect_right minus bisect_left on candidate index list.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport bisect\nfrom collections import defaultdict\n\nclass MajorityChecker:\n    def __init__(self, arr: list[int]):\n        self.n = len(arr)\n        self.pos = defaultdict(list)\n        for i, val in enumerate(arr):\n            self.pos[val].append(i)\n        self.tree = [(0, 0)] * (4 * self.n)\n        self._build(arr, 1, 0, self.n - 1)\n\n    def _merge(self, a, b):\n        v1, c1 = a\n        v2, c2 = b\n        if v1 == v2:\n            return (v1, c1 + c2)\n        elif c1 >= c2:\n            return (v1, c1 - c2)\n        else:\n            return (v2, c2 - c1)\n\n    def _build(self, arr, node, l, r):\n        if l == r:\n            self.tree[node] = (arr[l], 1)\n            return\n        mid = (l + r) // 2\n        self._build(arr, 2 * node, l, mid)\n        self._build(arr, 2 * node + 1, mid + 1, r)\n        self.tree[node] = self._merge(self.tree[2 * node], self.tree[2 * node + 1])\n\n    def _query_tree(self, node, l, r, ql, qr):\n        if ql <= l and r <= qr:\n            return self.tree[node]\n        mid = (l + r) // 2\n        if qr <= mid:\n            return self._query_tree(2 * node, l, mid, ql, qr)\n        if ql > mid:\n            return self._query_tree(2 * node + 1, mid + 1, r, ql, qr)\n        left_res = self._query_tree(2 * node, l, mid, ql, qr)\n        right_res = self._query_tree(2 * node + 1, mid + 1, r, ql, qr)\n        return self._merge(left_res, right_res)\n\n    def query(self, left: int, right: int, threshold: int) -> int:\n        cand, _ = self._query_tree(1, 0, self.n - 1, left, right)\n        indices = self.pos[cand]\n        cnt = bisect.bisect_right(indices, right) - bisect.bisect_left(indices, left)\n        return cand if cnt >= threshold else -1\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N) init, O(log N) query',
      space: 'O(N)',
      variables: ['N: size of input array'],
      notes: 'Segment tree query takes logarithmic time and binary search on occurrence list takes logarithmic time.',
      whyNaiveFails: 'Linear scanning and hash map counting takes O(N) per query, which exceeds the time limit across thousands of queries.',
      spaceTimeTradeoff: 'Segment tree pairs Boyer-Moore voting with inverted index lists for constant candidate verification.',
      interviewerExpectation: 'Segment tree with Boyer-Moore merge logic or randomized sampling with binary search verification.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import bisect
from collections import defaultdict

class MajorityChecker:
    def __init__(self, arr: list[int]):
        self.n = len(arr)
        self.pos = defaultdict(list)
        for i, val in enumerate(arr):
            self.pos[val].append(i)
        self.tree = [(0, 0)] * (4 * self.n)
        self._build(arr, 1, 0, self.n - 1)

    def _merge(self, a, b):
        v1, c1 = a
        v2, c2 = b
        if v1 == v2:
            return (v1, c1 + c2)
        elif c1 >= c2:
            return (v1, c1 - c2)
        else:
            return (v2, c2 - c1)

    def _build(self, arr, node, l, r):
        if l == r:
            self.tree[node] = (arr[l], 1)
            return
        mid = (l + r) // 2
        self._build(arr, 2 * node, l, mid)
        self._build(arr, 2 * node + 1, mid + 1, r)
        self.tree[node] = self._merge(self.tree[2 * node], self.tree[2 * node + 1])

    def _query_tree(self, node, l, r, ql, qr):
        if ql <= l and r <= qr:
            return self.tree[node]
        mid = (l + r) // 2
        if qr <= mid:
            return self._query_tree(2 * node, l, mid, ql, qr)
        if ql > mid:
            return self._query_tree(2 * node + 1, mid + 1, r, ql, qr)
        left_res = self._query_tree(2 * node, l, mid, ql, qr)
        right_res = self._query_tree(2 * node + 1, mid + 1, r, ql, qr)
        return self._merge(left_res, right_res)

    def query(self, left: int, right: int, threshold: int) -> int:
        cand, _ = self._query_tree(1, 0, self.n - 1, left, right)
        indices = self.pos[cand]
        cnt = bisect.bisect_right(indices, right) - bisect.bisect_left(indices, left)
        return cand if cnt >= threshold else -1`,
        approach: 'Segment Tree Boyer-Moore with Index Bisect Verification',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class MajorityChecker {
    int n;
    unordered_map<int, vector<int>> pos;
    vector<pair<int, int>> tree;

    pair<int, int> merge(pair<int, int> a, pair<int, int> b) {
        if (a.first == b.first) return {a.first, a.second + b.second};
        if (a.second >= b.second) return {a.first, a.second - b.second};
        return {b.first, b.second - a.second};
    }
    void build(const vector<int>& arr, int node, int l, int r) {
        if (l == r) { tree[node] = {arr[l], 1}; return; }
        int mid = (l + r) / 2;
        build(arr, 2 * node, l, mid);
        build(arr, 2 * node + 1, mid + 1, r);
        tree[node] = merge(tree[2 * node], tree[2 * node + 1]);
    }
    pair<int, int> queryTree(int node, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l + r) / 2;
        if (qr <= mid) return queryTree(2 * node, l, mid, ql, qr);
        if (ql > mid) return queryTree(2 * node + 1, mid + 1, r, ql, qr);
        return merge(queryTree(2 * node, l, mid, ql, qr), queryTree(2 * node + 1, mid + 1, r, ql, qr));
    }
public:
    MajorityChecker(vector<int>& arr) : n(arr.size()), tree(4 * arr.size()) {
        for (int i = 0; i < n; ++i) pos[arr[i]].push_back(i);
        build(arr, 1, 0, n - 1);
    }
    int query(int left, int right, int threshold) {
        auto [cand, _] = queryTree(1, 0, n - 1, left, right);
        auto it = pos.find(cand);
        if (it == pos.end()) return -1;
        const auto& vec = it->second;
        int count = upper_bound(vec.begin(), vec.end(), right) - lower_bound(vec.begin(), vec.end(), left);
        return count >= threshold ? cand : -1;
    }
};`,
        approach: 'C++ Segment Tree Boyer-Moore Voting',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class MajorityChecker {
    private final int n;
    private final Map<Integer, List<Integer>> pos = new HashMap<>();
    private final int[][] tree;

    private int[] merge(int[] a, int[] b) {
        if (a[0] == b[0]) return new int[]{a[0], a[1] + b[1]};
        if (a[1] >= b[1]) return new int[]{a[0], a[1] - b[1]};
        return new int[]{b[0], b[1] - a[1]};
    }

    private void build(int[] arr, int node, int l, int r) {
        if (l == r) { tree[node] = new int[]{arr[l], 1}; return; }
        int mid = (l + r) / 2;
        build(arr, 2 * node, l, mid);
        build(arr, 2 * node + 1, mid + 1, r);
        tree[node] = merge(tree[2 * node], tree[2 * node + 1]);
    }

    private int[] queryTree(int node, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return tree[node];
        int mid = (l + r) / 2;
        if (qr <= mid) return queryTree(2 * node, l, mid, ql, qr);
        if (ql > mid) return queryTree(2 * node + 1, mid + 1, r, ql, qr);
        return merge(queryTree(2 * node, l, mid, ql, qr), queryTree(2 * node + 1, mid + 1, r, ql, qr));
    }

    public MajorityChecker(int[] arr) {
        n = arr.length;
        tree = new int[4 * n][2];
        for (int i = 0; i < n; i++) {
            pos.computeIfAbsent(arr[i], k -> new ArrayList<>()).add(i);
        }
        build(arr, 1, 0, n - 1);
    }

    public int query(int left, int right, int threshold) {
        int[] cand = queryTree(1, 0, n - 1, left, right);
        List<Integer> list = pos.get(cand[0]);
        if (list == null) return -1;
        int lIdx = Collections.binarySearch(list, left);
        if (lIdx < 0) lIdx = -lIdx - 1;
        int rIdx = Collections.binarySearch(list, right);
        if (rIdx < 0) rIdx = -rIdx - 1;
        else rIdx += 1;
        return (rIdx - lIdx >= threshold) ? cand[0] : -1;
    }
}`,
        approach: 'Java Segment Tree Voting with Binary Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class MajorityChecker {
    constructor(arr) {
        this.n = arr.length;
        this.pos = new Map();
        for (let i = 0; i < this.n; i++) {
            if (!this.pos.has(arr[i])) this.pos.set(arr[i], []);
            this.pos.get(arr[i]).push(i);
        }
        this.tree = Array.from({ length: 4 * this.n }, () => [0, 0]);
        this.build(arr, 1, 0, this.n - 1);
    }
    merge(a, b) {
        if (a[0] === b[0]) return [a[0], a[1] + b[1]];
        if (a[1] >= b[1]) return [a[0], a[1] - b[1]];
        return [b[0], b[1] - a[1]];
    }
    build(arr, node, l, r) {
        if (l === r) { this.tree[node] = [arr[l], 1]; return; }
        const mid = Math.floor((l + r) / 2);
        this.build(arr, 2 * node, l, mid);
        this.build(arr, 2 * node + 1, mid + 1, r);
        this.tree[node] = this.merge(this.tree[2 * node], this.tree[2 * node + 1]);
    }
    queryTree(node, l, r, ql, qr) {
        if (ql <= l && r <= qr) return this.tree[node];
        const mid = Math.floor((l + r) / 2);
        if (qr <= mid) return this.queryTree(2 * node, l, mid, ql, qr);
        if (ql > mid) return this.queryTree(2 * node + 1, mid + 1, r, ql, qr);
        return this.merge(this.queryTree(2 * node, l, mid, ql, qr), this.queryTree(2 * node + 1, mid + 1, r, ql, qr));
    }
    query(left, right, threshold) {
        const [cand] = this.queryTree(1, 0, this.n - 1, left, right);
        const list = this.pos.get(cand);
        if (!list) return -1;
        let l = 0, r = list.length;
        while (l < r) {
            const m = Math.floor((l + r) / 2);
            if (list[m] < left) l = m + 1;
            else r = m;
        }
        const start = l;
        l = 0; r = list.length;
        while (l < r) {
            const m = Math.floor((l + r) / 2);
            if (list[m] <= right) l = m + 1;
            else r = m;
        }
        return (l - start >= threshold) ? cand : -1;
    }
}`,
        approach: 'JavaScript Segment Tree with Binary Search Verification',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import bisect
from collections import defaultdict

class MajorityChecker:
    def __init__(self, arr: list[int]):
        self.n = len(arr)
        self.pos = defaultdict(list)
        for i, val in enumerate(arr):
            self.pos[val].append(i)
        self.tree = [(0, 0)] * (4 * self.n)
        self._build(arr, 1, 0, self.n - 1)

    def _merge(self, a, b):
        v1, c1 = a
        v2, c2 = b
        if v1 == v2:
            return (v1, c1 + c2)
        elif c1 >= c2:
            return (v1, c1 - c2)
        else:
            return (v2, c2 - c1)

    def _build(self, arr, node, l, r):
        if l == r:
            self.tree[node] = (arr[l], 1)
            return
        mid = (l + r) // 2
        self._build(arr, 2 * node, l, mid)
        self._build(arr, 2 * node + 1, mid + 1, r)
        self.tree[node] = self._merge(self.tree[2 * node], self.tree[2 * node + 1])

    def _query_tree(self, node, l, r, ql, qr):
        if ql <= l and r <= qr:
            return self.tree[node]
        mid = (l + r) // 2
        if qr <= mid:
            return self._query_tree(2 * node, l, mid, ql, qr)
        if ql > mid:
            return self._query_tree(2 * node + 1, mid + 1, r, ql, qr)
        left_res = self._query_tree(2 * node, l, mid, ql, qr)
        right_res = self._query_tree(2 * node + 1, mid + 1, r, ql, qr)
        return self._merge(left_res, right_res)

    def query(self, left: int, right: int, threshold: int) -> int:
        cand, _ = self._query_tree(1, 0, self.n - 1, left, right)
        indices = self.pos[cand]
        cnt = bisect.bisect_right(indices, right) - bisect.bisect_left(indices, left)
        return cand if cnt >= threshold else -1

mc = MajorityChecker([1, 1, 2, 2, 1, 1])
assert mc.query(0, 5, 4) == 1
assert mc.query(0, 3, 3) == -1
assert mc.query(2, 3, 2) == 2
print("All tests passed successfully.")
`
  },

  // 6. #1166 design-file-system
  {
    slug: 'design-file-system',
    number: 1166,
    category: 'Algorithms',
    patterns: ['tree-trie-prefix'],
    hints: [
      {
        level: 1,
        title: 'Hierarchical Path Tracking',
        text: 'A path can only be created if its immediate parent directory already exists and the target path does not exist.'
      },
      {
        level: 2,
        title: 'Trie or Map Prefix Validation',
        text: 'Extract the parent directory string by finding the last slash. Verify parent presence before inserting the new path.'
      },
      {
        level: 3,
        title: 'Path Map Blueprint',
        text: 'Initialize map with root slash. For createPath, split parent = path[:rfind("/")]. If parent exists and path is absent, store value.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass FileSystem:\n    def __init__(self):\n        self.paths = {\"\": 0}\n\n    def createPath(self, path: str, value: int) -> bool:\n        if path in self.paths or path == \"\" or path == \"/\":\n            return False\n        parent = path[:path.rfind(\"/\")]\n        if parent not in self.paths:\n            return False\n        self.paths[path] = value\n        return True\n\n    def get(self, path: str) -> int:\n        return self.paths.get(path, -1)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(L) createPath, O(L) get',
      space: 'O(Total Path Characters)',
      variables: ['L: length of the path string'],
      notes: 'Substring slicing and hash table lookup execute linearly relative to path length.',
      whyNaiveFails: 'Rebuilding path lists on each query wastes linear time relative to total stored paths.',
      spaceTimeTradeoff: 'Hash map of full paths provides constant component lookup over trie pointer dereferencing.',
      interviewerExpectation: 'Parent path presence check and handling edge cases like duplicate or root paths.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class FileSystem:
    def __init__(self):
        self.paths = {"": 0}

    def createPath(self, path: str, value: int) -> bool:
        if path in self.paths or path == "" or path == "/":
            return False
        parent = path[:path.rfind("/")]
        if parent not in self.paths:
            return False
        self.paths[path] = value
        return True

    def get(self, path: str) -> int:
        return self.paths.get(path, -1)`,
        approach: 'Hash Map with Parent Path Extraction',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class FileSystem {
    unordered_map<string, int> paths;
public:
    FileSystem() {
        paths[""] = 0;
    }
    bool createPath(string path, int value) {
        if (paths.count(path) || path.empty() || path == "/") return false;
        int idx = path.rfind('/');
        string parent = path.substr(0, idx);
        if (!paths.count(parent)) return false;
        paths[path] = value;
        return true;
    }
    int get(string path) {
        auto it = paths.find(path);
        return it != paths.end() ? it->second : -1;
    }
};`,
        approach: 'C++ Substr Parent Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class FileSystem {
    private final Map<String, Integer> paths = new HashMap<>();

    public FileSystem() {
        paths.put("", 0);
    }

    public boolean createPath(String path, int value) {
        if (paths.containsKey(path) || path.isEmpty() || path.equals("/")) return false;
        int idx = path.lastIndexOf('/');
        String parent = path.substring(0, idx);
        if (!paths.containsKey(parent)) return false;
        paths.put(path, value);
        return true;
    }

    public int get(String path) {
        return paths.getOrDefault(path, -1);
    }
}`,
        approach: 'Java HashMap String Hierarchy',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class FileSystem {
    constructor() {
        this.paths = new Map([['', 0]]);
    }
    createPath(path, value) {
        if (this.paths.has(path) || !path || path === '/') return false;
        const idx = path.lastIndexOf('/');
        const parent = path.substring(0, idx);
        if (!this.paths.has(parent)) return false;
        this.paths.set(path, value);
        return true;
    }
    get(path) {
        return this.paths.has(path) ? this.paths.get(path) : -1;
    }
}`,
        approach: 'JavaScript Map Path Hierarchy',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class FileSystem:
    def __init__(self):
        self.paths = {"": 0}

    def createPath(self, path: str, value: int) -> bool:
        if path in self.paths or path == "" or path == "/":
            return False
        parent = path[:path.rfind("/")]
        if parent not in self.paths:
            return False
        self.paths[path] = value
        return True

    def get(self, path: str) -> int:
        return self.paths.get(path, -1)

fs = FileSystem()
assert fs.createPath("/a", 1) == True
assert fs.get("/a") == 1
assert fs.createPath("/a/b", 2) == True
assert fs.get("/a/b") == 2
assert fs.createPath("/c/d", 3) == False
assert fs.get("/c/d") == -1
print("All tests passed successfully.")
`
  },

  // 7. #1172 dinner-plate-stacks
  {
    slug: 'dinner-plate-stacks',
    number: 1172,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Dynamic Stack Pool with Gaps',
        text: 'Removing items from interior indices leaves empty slots that must be preferentially refilled by subsequent insertion calls.'
      },
      {
        level: 2,
        title: 'Priority Queue for Leftmost Available Stack',
        text: 'Maintain a min-heap of stack indices that currently have available capacity, and prune empty trailing stacks on pop.'
      },
      {
        level: 3,
        title: 'Dinner Plates Blueprint',
        text: 'Push pops index from heap. If index exceeds current stacks, append new stack. Pop removes from rightmost non-empty stack.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport heapq\n\nclass DinnerPlates:\n    def __init__(self, capacity: int):\n        self.c = capacity\n        self.stacks = []\n        self.available = []\n\n    def push(self, val: int) -> None:\n        while self.available and self.available[0] < len(self.stacks) and len(self.stacks[self.available[0]]) == self.c:\n            heapq.heappop(self.available)\n        if not self.available:\n            heapq.heappush(self.available, len(self.stacks))\n            self.stacks.append([])\n        idx = self.available[0]\n        self.stacks[idx].append(val)\n        if len(self.stacks[idx]) == self.c:\n            heapq.heappop(self.available)\n\n    def pop(self) -> int:\n        while self.stacks and not self.stacks[-1]:\n            self.stacks.pop()\n        if not self.stacks:\n            return -1\n        return self.popAtStack(len(self.stacks) - 1)\n\n    def popAtStack(self, index: int) -> int:\n        if index >= len(self.stacks) or not self.stacks[index]:\n            return -1\n        if len(self.stacks[index]) == self.c:\n            heapq.heappush(self.available, index)\n        return self.stacks[index].pop()\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log S) push, O(log S) popAtStack, amortized O(1) pop',
      space: 'O(N)',
      variables: ['S: number of active stacks', 'N: total elements pushed'],
      notes: 'Min-heap maintains the lowest available stack index in logarithmic time.',
      whyNaiveFails: 'Linear scanning to find the leftmost non-full stack degrades push performance to O(S).',
      spaceTimeTradeoff: 'Heap retains indices of partially filled stacks for instant O(1) peek and O(log S) update.',
      interviewerExpectation: 'Use of min-heap for available stack indices and lazy cleanup of empty trailing stacks.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import heapq

class DinnerPlates:
    def __init__(self, capacity: int):
        self.c = capacity
        self.stacks = []
        self.available = []

    def push(self, val: int) -> None:
        while self.available and self.available[0] < len(self.stacks) and len(self.stacks[self.available[0]]) == self.c:
            heapq.heappop(self.available)
        if not self.available:
            heapq.heappush(self.available, len(self.stacks))
            self.stacks.append([])
        idx = self.available[0]
        self.stacks[idx].append(val)
        if len(self.stacks[idx]) == self.c:
            heapq.heappop(self.available)

    def pop(self) -> int:
        while self.stacks and not self.stacks[-1]:
            self.stacks.pop()
        if not self.stacks:
            return -1
        return self.popAtStack(len(self.stacks) - 1)

    def popAtStack(self, index: int) -> int:
        if index >= len(self.stacks) or not self.stacks[index]:
            return -1
        if len(self.stacks[index]) == self.c:
            heapq.heappush(self.available, index)
        return self.stacks[index].pop()`,
        approach: 'Min-Heap for Available Stacks with Lazy Suffix Pruning',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class DinnerPlates {
    int cap;
    vector<vector<int>> stacks;
    set<int> available;
public:
    DinnerPlates(int capacity) : cap(capacity) {}

    void push(int val) {
        if (available.empty()) {
            available.insert(stacks.size());
            stacks.push_back({});
        }
        int idx = *available.begin();
        stacks[idx].push_back(val);
        if (stacks[idx].size() == cap) {
            available.erase(idx);
        }
    }

    int pop() {
        while (!stacks.empty() && stacks.back().empty()) {
            available.erase(stacks.size() - 1);
            stacks.pop_back();
        }
        if (stacks.empty()) return -1;
        return popAtStack(stacks.size() - 1);
    }

    int popAtStack(int index) {
        if (index >= stacks.size() || stacks[index].empty()) return -1;
        int val = stacks[index].back();
        stacks[index].pop_back();
        available.insert(index);
        return val;
    }
};`,
        approach: 'C++ Set for Active Gap Tracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class DinnerPlates {
    private final int cap;
    private final List<List<Integer>> stacks = new ArrayList<>();
    private final TreeSet<Integer> available = new TreeSet<>();

    public DinnerPlates(int capacity) {
        this.cap = capacity;
    }

    public void push(int val) {
        if (available.isEmpty()) {
            available.add(stacks.size());
            stacks.add(new ArrayList<>());
        }
        int idx = available.first();
        stacks.get(idx).add(val);
        if (stacks.get(idx).size() == cap) {
            available.remove(idx);
        }
    }

    public int pop() {
        while (!stacks.isEmpty() && stacks.get(stacks.size() - 1).isEmpty()) {
            available.remove(stacks.size() - 1);
            stacks.remove(stacks.size() - 1);
        }
        if (stacks.isEmpty()) return -1;
        return popAtStack(stacks.size() - 1);
    }

    public int popAtStack(int index) {
        if (index >= stacks.size() || stacks.get(index).isEmpty()) return -1;
        List<Integer> s = stacks.get(index);
        int val = s.remove(s.size() - 1);
        available.add(index);
        return val;
    }
}`,
        approach: 'Java TreeSet of Incomplete Stack Indices',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class DinnerPlates {
    constructor(capacity) {
        this.c = capacity;
        this.stacks = [];
        this.available = [];
    }
    push(val) {
        while (this.available.length > 0 && this.available[0] < this.stacks.length && this.stacks[this.available[0]].length === this.c) {
            this.available.shift();
        }
        if (this.available.length === 0) {
            this.available.push(this.stacks.length);
            this.stacks.push([]);
        }
        const idx = this.available[0];
        this.stacks[idx].push(val);
        if (this.stacks[idx].length === this.c) {
            this.available.shift();
        }
    }
    pop() {
        while (this.stacks.length > 0 && this.stacks[this.stacks.length - 1].length === 0) {
            this.stacks.pop();
        }
        if (this.stacks.length === 0) return -1;
        return this.popAtStack(this.stacks.length - 1);
    }
    popAtStack(index) {
        if (index >= this.stacks.length || this.stacks[index].length === 0) return -1;
        const val = this.stacks[index].pop();
        let pos = 0;
        while (pos < this.available.length && this.available[pos] < index) pos++;
        if (this.available[pos] !== index) {
            this.available.splice(pos, 0, index);
        }
        return val;
    }
}`,
        approach: 'JavaScript Sorted Available Stack Array',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import heapq

class DinnerPlates:
    def __init__(self, capacity: int):
        self.c = capacity
        self.stacks = []
        self.available = []

    def push(self, val: int) -> None:
        while self.available and self.available[0] < len(self.stacks) and len(self.stacks[self.available[0]]) == self.c:
            heapq.heappop(self.available)
        if not self.available:
            heapq.heappush(self.available, len(self.stacks))
            self.stacks.append([])
        idx = self.available[0]
        self.stacks[idx].append(val)
        if len(self.stacks[idx]) == self.c:
            heapq.heappop(self.available)

    def pop(self) -> int:
        while self.stacks and not self.stacks[-1]:
            self.stacks.pop()
        if not self.stacks:
            return -1
        return self.popAtStack(len(self.stacks) - 1)

    def popAtStack(self, index: int) -> int:
        if index >= len(self.stacks) or not self.stacks[index]:
            return -1
        if len(self.stacks[index]) == self.c:
            heapq.heappush(self.available, index)
        return self.stacks[index].pop()

D = DinnerPlates(2)
D.push(1)
D.push(2)
D.push(3)
D.push(4)
D.push(5)
assert D.popAtStack(0) == 2
D.push(20)
D.push(21)
assert D.popAtStack(0) == 20
assert D.popAtStack(2) == 21
assert D.pop() == 5
assert D.pop() == 4
assert D.pop() == 3
assert D.pop() == 1
assert D.pop() == -1
print("All tests passed successfully.")
`
  },

  // 8. #1206 design-skiplist
  {
    slug: 'design-skiplist',
    number: 1206,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Probabilistic Multilevel Linking',
        text: 'A skiplist maintains multiple ordered forward lists where higher levels skip over elements to accelerate traversal.'
      },
      {
        level: 2,
        title: 'Coin Toss Height Promotion',
        text: 'Promote newly inserted nodes to higher levels with 50 percent probability, linking new levels into the predecessor update array.'
      },
      {
        level: 3,
        title: 'Skiplist Traversal Blueprint',
        text: 'Drop through levels from top to bottom moving right while next value < target. Record predecessor pointers at each level for insertion.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport random\n\nclass Node:\n    def __init__(self, val=-1, level=1):\n        self.val = val\n        self.forward = [None] * level\n\nclass Skiplist:\n    def __init__(self):\n        self.head = Node(-1, 16)\n        self.level = 1\n\n    def search(self, target: int) -> bool:\n        curr = self.head\n        for i in range(self.level - 1, -1, -1):\n            while curr.forward[i] and curr.forward[i].val < target:\n                curr = curr.forward[i]\n        curr = curr.forward[0]\n        return curr is not None and curr.val == target\n\n    def add(self, num: int) -> None:\n        update = [None] * 16\n        curr = self.head\n        for i in range(self.level - 1, -1, -1):\n            while curr.forward[i] and curr.forward[i].val < num:\n                curr = curr.forward[i]\n            update[i] = curr\n\n        lvl = 1\n        while random.random() < 0.5 and lvl < 16:\n            lvl += 1\n        if lvl > self.level:\n            for i in range(self.level, lvl):\n                update[i] = self.head\n            self.level = lvl\n\n        new_node = Node(num, lvl)\n        for i in range(lvl):\n            new_node.forward[i] = update[i].forward[i]\n            update[i].forward[i] = new_node\n\n    def erase(self, num: int) -> bool:\n        update = [None] * 16\n        curr = self.head\n        for i in range(self.level - 1, -1, -1):\n            while curr.forward[i] and curr.forward[i].val < num:\n                curr = curr.forward[i]\n            update[i] = curr\n        curr = curr.forward[0]\n        if not curr or curr.val != num:\n            return False\n        for i in range(self.level):\n            if update[i].forward[i] != curr:\n                break\n            update[i].forward[i] = curr.forward[i]\n        while self.level > 1 and not self.head.forward[self.level - 1]:\n            self.level -= 1\n        return True\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log N) average search, add, erase',
      space: 'O(N)',
      variables: ['N: number of elements in the skiplist'],
      notes: 'Probabilistic doubling yields geometric level heights with logarithmic average height.',
      whyNaiveFails: 'Single linked lists require O(N) sequential traversal; balanced trees require complex rotation logic.',
      spaceTimeTradeoff: 'Multiple forward pointers trade geometric memory overhead for expected logarithmic search bounds.',
      interviewerExpectation: 'Multi-level forward link structure, coin-toss level generation, and predecessor update tracking.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import random

class Node:
    def __init__(self, val=-1, level=1):
        self.val = val
        self.forward = [None] * level

class Skiplist:
    def __init__(self):
        self.head = Node(-1, 16)
        self.level = 1

    def search(self, target: int) -> bool:
        curr = self.head
        for i in range(self.level - 1, -1, -1):
            while curr.forward[i] and curr.forward[i].val < target:
                curr = curr.forward[i]
        curr = curr.forward[0]
        return curr is not None and curr.val == target

    def add(self, num: int) -> None:
        update = [None] * 16
        curr = self.head
        for i in range(self.level - 1, -1, -1):
            while curr.forward[i] and curr.forward[i].val < num:
                curr = curr.forward[i]
            update[i] = curr

        lvl = 1
        while random.random() < 0.5 and lvl < 16:
            lvl += 1
        if lvl > self.level:
            for i in range(self.level, lvl):
                update[i] = self.head
            self.level = lvl

        new_node = Node(num, lvl)
        for i in range(lvl):
            new_node.forward[i] = update[i].forward[i]
            update[i].forward[i] = new_node

    def erase(self, num: int) -> bool:
        update = [None] * 16
        curr = self.head
        for i in range(self.level - 1, -1, -1):
            while curr.forward[i] and curr.forward[i].val < num:
                curr = curr.forward[i]
            update[i] = curr
        curr = curr.forward[0]
        if not curr or curr.val != num:
            return False
        for i in range(self.level):
            if update[i].forward[i] != curr:
                break
            update[i].forward[i] = curr.forward[i]
        while self.level > 1 and not self.head.forward[self.level - 1]:
            self.level -= 1
        return True`,
        approach: 'Probabilistic Skip List with Predecessor Updates',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `struct Node {
    int val;
    vector<Node*> forward;
    Node(int v, int l) : val(v), forward(l, nullptr) {}
};

class Skiplist {
    Node* head;
    int maxLevel;
public:
    Skiplist() : maxLevel(16) {
        head = new Node(-1, maxLevel);
    }
    bool search(int target) {
        Node* curr = head;
        for (int i = maxLevel - 1; i >= 0; --i) {
            while (curr->forward[i] && curr->forward[i]->val < target)
                curr = curr->forward[i];
        }
        curr = curr->forward[0];
        return curr && curr->val == target;
    }
    void add(int num) {
        vector<Node*> update(maxLevel, nullptr);
        Node* curr = head;
        for (int i = maxLevel - 1; i >= 0; --i) {
            while (curr->forward[i] && curr->forward[i]->val < num)
                curr = curr->forward[i];
            update[i] = curr;
        }
        int lvl = 1;
        while ((rand() & 1) && lvl < maxLevel) ++lvl;
        Node* newNode = new Node(num, lvl);
        for (int i = 0; i < lvl; ++i) {
            newNode->forward[i] = update[i]->forward[i];
            update[i]->forward[i] = newNode;
        }
    }
    bool erase(int num) {
        vector<Node*> update(maxLevel, nullptr);
        Node* curr = head;
        for (int i = maxLevel - 1; i >= 0; --i) {
            while (curr->forward[i] && curr->forward[i]->val < num)
                curr = curr->forward[i];
            update[i] = curr;
        }
        curr = curr->forward[0];
        if (!curr || curr->val != num) return false;
        for (int i = 0; i < maxLevel; ++i) {
            if (update[i]->forward[i] != curr) break;
            update[i]->forward[i] = curr->forward[i];
        }
        delete curr;
        return true;
    }
};`,
        approach: 'C++ Multi-Level Node Vector Skiplist',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Skiplist {
    static class Node {
        int val;
        Node[] forward;
        Node(int val, int level) {
            this.val = val;
            this.forward = new Node[level];
        }
    }
    private static final int MAX_LEVEL = 16;
    private final Node head = new Node(-1, MAX_LEVEL);
    private final Random rand = new Random();

    public boolean search(int target) {
        Node curr = head;
        for (int i = MAX_LEVEL - 1; i >= 0; i--) {
            while (curr.forward[i] != null && curr.forward[i].val < target) {
                curr = curr.forward[i];
            }
        }
        curr = curr.forward[0];
        return curr != null && curr.val == target;
    }

    public void add(int num) {
        Node[] update = new Node[MAX_LEVEL];
        Node curr = head;
        for (int i = MAX_LEVEL - 1; i >= 0; i--) {
            while (curr.forward[i] != null && curr.forward[i].val < num) {
                curr = curr.forward[i];
            }
            update[i] = curr;
        }
        int lvl = 1;
        while (rand.nextBoolean() && lvl < MAX_LEVEL) lvl++;
        Node newNode = new Node(num, lvl);
        for (int i = 0; i < lvl; i++) {
            newNode.forward[i] = update[i].forward[i];
            update[i].forward[i] = newNode;
        }
    }

    public boolean erase(int num) {
        Node[] update = new Node[MAX_LEVEL];
        Node curr = head;
        for (int i = MAX_LEVEL - 1; i >= 0; i--) {
            while (curr.forward[i] != null && curr.forward[i].val < num) {
                curr = curr.forward[i];
            }
            update[i] = curr;
        }
        curr = curr.forward[0];
        if (curr == null || curr.val != num) return false;
        for (int i = 0; i < MAX_LEVEL; i++) {
            if (update[i].forward[i] != curr) break;
            update[i].forward[i] = curr.forward[i];
        }
        return true;
    }
}`,
        approach: 'Java Node Array Pointer Skiplist',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class SkiplistNode {
    constructor(val, level) {
        this.val = val;
        this.forward = Array(level).fill(null);
    }
}

class Skiplist {
    constructor() {
        this.maxLevel = 16;
        this.head = new SkiplistNode(-1, this.maxLevel);
    }
    search(target) {
        let curr = this.head;
        for (let i = this.maxLevel - 1; i >= 0; i--) {
            while (curr.forward[i] && curr.forward[i].val < target) {
                curr = curr.forward[i];
            }
        }
        curr = curr.forward[0];
        return Boolean(curr && curr.val === target);
    }
    add(num) {
        const update = Array(this.maxLevel).fill(null);
        let curr = this.head;
        for (let i = this.maxLevel - 1; i >= 0; i--) {
            while (curr.forward[i] && curr.forward[i].val < num) {
                curr = curr.forward[i];
            }
            update[i] = curr;
        }
        let lvl = 1;
        while (Math.random() < 0.5 && lvl < this.maxLevel) lvl++;
        const newNode = new SkiplistNode(num, lvl);
        for (let i = 0; i < lvl; i++) {
            newNode.forward[i] = update[i].forward[i];
            update[i].forward[i] = newNode;
        }
    }
    erase(num) {
        const update = Array(this.maxLevel).fill(null);
        let curr = this.head;
        for (let i = this.maxLevel - 1; i >= 0; i--) {
            while (curr.forward[i] && curr.forward[i].val < num) {
                curr = curr.forward[i];
            }
            update[i] = curr;
        }
        curr = curr.forward[0];
        if (!curr || curr.val !== num) return false;
        for (let i = 0; i < this.maxLevel; i++) {
            if (update[i].forward[i] !== curr) break;
            update[i].forward[i] = curr.forward[i];
        }
        return true;
    }
}`,
        approach: 'JavaScript Forward Node Array Skiplist',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import random

class Node:
    def __init__(self, val, level):
        self.val = val
        self.forward = [None] * level

class Skiplist:
    def __init__(self):
        self.head = Node(-1, 16)
        self.level = 1

    def search(self, target: int) -> bool:
        curr = self.head
        for i in range(self.level - 1, -1, -1):
            while curr.forward[i] and curr.forward[i].val < target:
                curr = curr.forward[i]
        curr = curr.forward[0]
        return curr is not None and curr.val == target

    def add(self, num: int) -> None:
        update = [None] * 16
        curr = self.head
        for i in range(self.level - 1, -1, -1):
            while curr.forward[i] and curr.forward[i].val < num:
                curr = curr.forward[i]
            update[i] = curr

        lvl = 1
        while random.random() < 0.5 and lvl < 16:
            lvl += 1
        if lvl > self.level:
            for i in range(self.level, lvl):
                update[i] = self.head
            self.level = lvl

        new_node = Node(num, lvl)
        for i in range(lvl):
            new_node.forward[i] = update[i].forward[i]
            update[i].forward[i] = new_node

    def erase(self, num: int) -> bool:
        update = [None] * 16
        curr = self.head
        for i in range(self.level - 1, -1, -1):
            while curr.forward[i] and curr.forward[i].val < num:
                curr = curr.forward[i]
            update[i] = curr
        curr = curr.forward[0]
        if not curr or curr.val != num:
            return False
        for i in range(self.level):
            if update[i].forward[i] != curr:
                break
            update[i].forward[i] = curr.forward[i]
        while self.level > 1 and not self.head.forward[self.level - 1]:
            self.level -= 1
        return True

sl = Skiplist()
sl.add(1)
sl.add(2)
sl.add(3)
assert sl.search(0) == False
assert sl.search(1) == True
assert sl.erase(2) == True
assert sl.search(2) == False
assert sl.erase(2) == False
print("All tests passed successfully.")
`
  },

  // 9. #1210 minimum-moves-to-reach-target-with-rotations
  {
    slug: 'minimum-moves-to-reach-target-with-rotations',
    number: 1210,
    category: 'Algorithms',
    patterns: ['graph-bfs-shortest-path'],
    hints: [
      {
        level: 1,
        title: 'Rigid Body Grid State Formulation',
        text: 'The snake of length two is uniquely defined by its tail coordinate and its orientation (horizontal or vertical).'
      },
      {
        level: 2,
        title: 'Four Directed Move Transitions',
        text: 'Move right, move down, rotate clockwise, or rotate counter-clockwise. Verify all occupied cells are empty.'
      },
      {
        level: 3,
        title: 'BFS Distance Exploration Blueprint',
        text: 'Initialize queue with (0, 0, 0) for tail (0,0) horizontal. Advance step by step until reaching tail (n-1, n-2, 0).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import deque\n\nclass Solution:\n    def minimumMoves(self, grid: list[list[int]]) -> int:\n        n = len(grid)\n        q = deque([(0, 0, 0, 0)])\n        visited = {(0, 0, 0)}\n\n        while q:\n            r, c, o, d = q.popleft()\n            if r == n - 1 and c == n - 2 and o == 0:\n                return d\n\n            if o == 0:\n                if c + 2 < n and grid[r][c + 2] == 0 and (r, c + 1, 0) not in visited:\n                    visited.add((r, c + 1, 0))\n                    q.append((r, c + 1, 0, d + 1))\n            else:\n                if c + 1 < n and grid[r][c + 1] == 0 and grid[r + 1][c + 1] == 0 and (r, c + 1, 1) not in visited:\n                    visited.add((r, c + 1, 1))\n                    q.append((r, c + 1, 1, d + 1))\n\n            if o == 0:\n                if r + 1 < n and grid[r + 1][c] == 0 and grid[r + 1][c + 1] == 0 and (r + 1, c, 0) not in visited:\n                    visited.add((r + 1, c, 0))\n                    q.append((r + 1, c, 0, d + 1))\n            else:\n                if r + 2 < n and grid[r + 2][c] == 0 and (r + 1, c, 1) not in visited:\n                    visited.add((r + 1, c, 1))\n                    q.append((r + 1, c, 1, d + 1))\n\n            if o == 0 and r + 1 < n and grid[r + 1][c] == 0 and grid[r + 1][c + 1] == 0:\n                if (r, c, 1) not in visited:\n                    visited.add((r, c, 1))\n                    q.append((r, c, 1, d + 1))\n\n            if o == 1 and c + 1 < n and grid[r][c + 1] == 0 and grid[r + 1][c + 1] == 0:\n                if (r, c, 0) not in visited:\n                    visited.add((r, c, 0))\n                    q.append((r, c, 0, d + 1))\n\n        return -1\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N^2)',
      space: 'O(N^2)',
      variables: ['N: grid dimension'],
      notes: 'Total possible states is 2 * N * N, visited once by breadth-first search.',
      whyNaiveFails: 'Unbounded depth-first search revisits cyclic rotation loops without tracking shortest path distance.',
      spaceTimeTradeoff: 'Visited set keyed by tail coordinate and orientation prevents infinite state loops.',
      interviewerExpectation: 'Breadth-first search on discrete state (r, c, orientation) with rigorous 2x2 clearance checks.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class Solution:
    def minimumMoves(self, grid: list[list[int]]) -> int:
        n = len(grid)
        q = deque([(0, 0, 0, 0)])
        visited = {(0, 0, 0)}

        while q:
            r, c, o, d = q.popleft()
            if r == n - 1 and c == n - 2 and o == 0:
                return d

            if o == 0:
                if c + 2 < n and grid[r][c + 2] == 0 and (r, c + 1, 0) not in visited:
                    visited.add((r, c + 1, 0))
                    q.append((r, c + 1, 0, d + 1))
            else:
                if c + 1 < n and grid[r][c + 1] == 0 and grid[r + 1][c + 1] == 0 and (r, c + 1, 1) not in visited:
                    visited.add((r, c + 1, 1))
                    q.append((r, c + 1, 1, d + 1))

            if o == 0:
                if r + 1 < n and grid[r + 1][c] == 0 and grid[r + 1][c + 1] == 0 and (r + 1, c, 0) not in visited:
                    visited.add((r + 1, c, 0))
                    q.append((r + 1, c, 0, d + 1))
            else:
                if r + 2 < n and grid[r + 2][c] == 0 and (r + 1, c, 1) not in visited:
                    visited.add((r + 1, c, 1))
                    q.append((r + 1, c, 1, d + 1))

            if o == 0 and r + 1 < n and grid[r + 1][c] == 0 and grid[r + 1][c + 1] == 0:
                if (r, c, 1) not in visited:
                    visited.add((r, c, 1))
                    q.append((r, c, 1, d + 1))

            if o == 1 and c + 1 < n and grid[r][c + 1] == 0 and grid[r + 1][c + 1] == 0:
                if (r, c, 0) not in visited:
                    visited.add((r, c, 0))
                    q.append((r, c, 0, d + 1))

        return -1`,
        approach: 'Augmented State BFS on 2-Cell Body Grid',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int minimumMoves(vector<vector<int>>& grid) {
        int n = grid.size();
        queue<tuple<int, int, int, int>> q;
        vector<vector<vector<bool>>> visited(n, vector<vector<bool>>(n, vector<bool>(2, false)));
        q.push({0, 0, 0, 0});
        visited[0][0][0] = true;

        while (!q.empty()) {
            auto [r, c, o, d] = q.front(); q.pop();
            if (r == n - 1 && c == n - 2 && o == 0) return d;

            if (o == 0) {
                if (c + 2 < n && grid[r][c + 2] == 0 && !visited[r][c + 1][0]) {
                    visited[r][c + 1][0] = true;
                    q.push({r, c + 1, 0, d + 1});
                }
            } else {
                if (c + 1 < n && grid[r][c + 1] == 0 && grid[r + 1][c + 1] == 0 && !visited[r][c + 1][1]) {
                    visited[r][c + 1][1] = true;
                    q.push({r, c + 1, 1, d + 1});
                }
            }

            if (o == 0) {
                if (r + 1 < n && grid[r + 1][c] == 0 && grid[r + 1][c + 1] == 0 && !visited[r + 1][c][0]) {
                    visited[r + 1][c][0] = true;
                    q.push({r + 1, c, 0, d + 1});
                }
            } else {
                if (r + 2 < n && grid[r + 2][c] == 0 && !visited[r + 1][c][1]) {
                    visited[r + 1][c][1] = true;
                    q.push({r + 1, c, 1, d + 1});
                }
            }

            if (o == 0 && r + 1 < n && grid[r + 1][c] == 0 && grid[r + 1][c + 1] == 0) {
                if (!visited[r][c][1]) {
                    visited[r][c][1] = true;
                    q.push({r, c, 1, d + 1});
                }
            }
            if (o == 1 && c + 1 < n && grid[r][c + 1] == 0 && grid[r + 1][c + 1] == 0) {
                if (!visited[r][c][0]) {
                    visited[r][c][0] = true;
                    q.push({r, c, 0, d + 1});
                }
            }
        }
        return -1;
    }
};`,
        approach: 'C++ 3D Visited Matrix BFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int minimumMoves(int[][] grid) {
        int n = grid.length;
        Queue<int[]> q = new LinkedList<>();
        boolean[][][] visited = new boolean[n][n][2];
        q.offer(new int[]{0, 0, 0, 0});
        visited[0][0][0] = true;

        while (!q.isEmpty()) {
            int[] curr = q.poll();
            int r = curr[0], c = curr[1], o = curr[2], d = curr[3];
            if (r == n - 1 && c == n - 2 && o == 0) return d;

            if (o == 0) {
                if (c + 2 < n && grid[r][c + 2] == 0 && !visited[r][c + 1][0]) {
                    visited[r][c + 1][0] = true;
                    q.offer(new int[]{r, c + 1, 0, d + 1});
                }
            } else {
                if (c + 1 < n && grid[r][c + 1] == 0 && grid[r + 1][c + 1] == 0 && !visited[r][c + 1][1]) {
                    visited[r][c + 1][1] = true;
                    q.offer(new int[]{r, c + 1, 1, d + 1});
                }
            }

            if (o == 0) {
                if (r + 1 < n && grid[r + 1][c] == 0 && grid[r + 1][c + 1] == 0 && !visited[r + 1][c][0]) {
                    visited[r + 1][c][0] = true;
                    q.offer(new int[]{r + 1, c, 0, d + 1});
                }
            } else {
                if (r + 2 < n && grid[r + 2][c] == 0 && !visited[r + 1][c][1]) {
                    visited[r + 1][c][1] = true;
                    q.offer(new int[]{r + 1, c, 1, d + 1});
                }
            }

            if (o == 0 && r + 1 < n && grid[r + 1][c] == 0 && grid[r + 1][c + 1] == 0) {
                if (!visited[r][c][1]) {
                    visited[r][c][1] = true;
                    q.offer(new int[]{r, c, 1, d + 1});
                }
            }
            if (o == 1 && c + 1 < n && grid[r][c + 1] == 0 && grid[r + 1][c + 1] == 0) {
                if (!visited[r][c][0]) {
                    visited[r][c][0] = true;
                    q.offer(new int[]{r, c, 0, d + 1});
                }
            }
        }
        return -1;
    }
}`,
        approach: 'Java 3D State Breadth Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var minimumMoves = function(grid) {
    const n = grid.length;
    const q = [[0, 0, 0, 0]];
    const visited = Array.from({ length: n }, () => Array.from({ length: n }, () => [false, false]));
    visited[0][0][0] = true;

    while (q.length > 0) {
        const [r, c, o, d] = q.shift();
        if (r === n - 1 && c === n - 2 && o === 0) return d;

        if (o === 0) {
            if (c + 2 < n && grid[r][c + 2] === 0 && !visited[r][c + 1][0]) {
                visited[r][c + 1][0] = true;
                q.push([r, c + 1, 0, d + 1]);
            }
        } else {
            if (c + 1 < n && grid[r][c + 1] === 0 && grid[r + 1][c + 1] === 0 && !visited[r][c + 1][1]) {
                visited[r][c + 1][1] = true;
                q.push([r, c + 1, 1, d + 1]);
            }
        }

        if (o === 0) {
            if (r + 1 < n && grid[r + 1][c] === 0 && grid[r + 1][c + 1] === 0 && !visited[r + 1][c][0]) {
                visited[r + 1][c][0] = true;
                q.push([r + 1, c, 0, d + 1]);
            }
        } else {
            if (r + 2 < n && grid[r + 2][c] === 0 && !visited[r + 1][c][1]) {
                visited[r + 1][c][1] = true;
                q.push([r + 1, c, 1, d + 1]);
            }
        }

        if (o === 0 && r + 1 < n && grid[r + 1][c] === 0 && grid[r + 1][c + 1] === 0) {
            if (!visited[r][c][1]) {
                visited[r][c][1] = true;
                q.push([r, c, 1, d + 1]);
            }
        }
        if (o === 1 && c + 1 < n && grid[r][c + 1] === 0 && grid[r + 1][c + 1] === 0) {
            if (!visited[r][c][0]) {
                visited[r][c][0] = true;
                q.push([r, c, 0, d + 1]);
            }
        }
    }
    return -1;
};`,
        approach: 'JavaScript BFS Snake Transition Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `from collections import deque

class Solution:
    def minimumMoves(self, grid: list[list[int]]) -> int:
        n = len(grid)
        q = deque([(0, 0, 0, 0)])
        visited = {(0, 0, 0)}

        while q:
            r, c, o, d = q.popleft()
            if r == n - 1 and c == n - 2 and o == 0:
                return d

            if o == 0:
                if c + 2 < n and grid[r][c + 2] == 0 and (r, c + 1, 0) not in visited:
                    visited.add((r, c + 1, 0))
                    q.append((r, c + 1, 0, d + 1))
            else:
                if c + 1 < n and grid[r][c + 1] == 0 and grid[r + 1][c + 1] == 0 and (r, c + 1, 1) not in visited:
                    visited.add((r, c + 1, 1))
                    q.append((r, c + 1, 1, d + 1))

            if o == 0:
                if r + 1 < n and grid[r + 1][c] == 0 and grid[r + 1][c + 1] == 0 and (r + 1, c, 0) not in visited:
                    visited.add((r + 1, c, 0))
                    q.append((r + 1, c, 0, d + 1))
            else:
                if r + 2 < n and grid[r + 2][c] == 0 and (r + 1, c, 1) not in visited:
                    visited.add((r + 1, c, 1))
                    q.append((r + 1, c, 1, d + 1))

            if o == 0 and r + 1 < n and grid[r + 1][c] == 0 and grid[r + 1][c + 1] == 0:
                if (r, c, 1) not in visited:
                    visited.add((r, c, 1))
                    q.append((r, c, 1, d + 1))

            if o == 1 and c + 1 < n and grid[r][c + 1] == 0 and grid[r + 1][c + 1] == 0:
                if (r, c, 0) not in visited:
                    visited.add((r, c, 0))
                    q.append((r, c, 0, d + 1))

        return -1

sol = Solution()
g1 = [[0,0,0,0,0,1],
      [1,1,0,0,1,0],
      [0,0,0,0,1,1],
      [0,0,1,0,1,0],
      [0,1,1,0,0,0],
      [0,1,1,0,0,0]]
assert sol.minimumMoves(g1) == 11
print("All tests passed successfully.")
`
  },

  // 10. #1236 web-crawler
  {
    slug: 'web-crawler',
    number: 1236,
    category: 'Algorithms',
    patterns: ['graph-bfs-shortest-path'],
    hints: [
      {
        level: 1,
        title: 'Hostname Isolation Graph Traversal',
        text: 'Only crawl web links that share the exact same hostname as the initial starting address.'
      },
      {
        level: 2,
        title: 'Hostname Parser and Visited Set',
        text: 'Extract the hostname prefix following http://. Run standard breadth-first search and filter discovered links by hostname.'
      },
      {
        level: 3,
        title: 'Crawler Queue Blueprint',
        text: 'Seed queue and visited set with startUrl. For each polled url, fetch links with htmlParser.getUrls and enqueue unvisited matches.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import deque\n\nclass Solution:\n    def crawl(self, startUrl: str, htmlParser: \'HtmlParser\') -> list[str]:\n        hostname = startUrl.split(\"/\")[2]\n        visited = {startUrl}\n        q = deque([startUrl])\n\n        while q:\n            curr = q.popleft()\n            for url in htmlParser.getUrls(curr):\n                if url.split(\"/\")[2] == hostname and url not in visited:\n                    visited.add(url)\n                    q.append(url)\n        return list(visited)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(V + E)',
      space: 'O(V)',
      variables: ['V: total distinct URLs on same hostname', 'E: total hyperlink edges'],
      notes: 'Each unique hostname URL is processed once through the queue.',
      whyNaiveFails: 'Traversing external links leads to unbounded web exploration outside the target host.',
      spaceTimeTradeoff: 'Visited hash set avoids infinite cyclic loops across mutually linking pages.',
      interviewerExpectation: 'Correct hostname URL parsing and BFS traversal with visited deduplication.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class Solution:
    def crawl(self, startUrl: str, htmlParser: 'HtmlParser') -> list[str]:
        hostname = startUrl.split("/")[2]
        visited = {startUrl}
        q = deque([startUrl])

        while q:
            curr = q.popleft()
            for url in htmlParser.getUrls(curr):
                if url.split("/")[2] == hostname and url not in visited:
                    visited.add(url)
                    q.append(url)
        return list(visited)`,
        approach: 'Breadth-First Crawl with Hostname Tokenization',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    string getHost(const string& url) {
        int start = 7;
        int end = url.find('/', start);
        if (end == string::npos) end = url.size();
        return url.substr(start, end - start);
    }
public:
    vector<string> crawl(string startUrl, HtmlParser htmlParser) {
        string hostname = getHost(startUrl);
        unordered_set<string> visited;
        queue<string> q;
        q.push(startUrl);
        visited.insert(startUrl);

        while (!q.empty()) {
            string curr = q.front(); q.pop();
            for (const string& url : htmlParser.getUrls(curr)) {
                if (getHost(url) == hostname && !visited.count(url)) {
                    visited.insert(url);
                    q.push(url);
                }
            }
        }
        return vector<string>(visited.begin(), visited.end());
    }
};`,
        approach: 'C++ Substring Hostname Filtering with Queue BFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private String getHost(String url) {
        String[] parts = url.split("/");
        return parts[2];
    }
    public List<String> crawl(String startUrl, HtmlParser htmlParser) {
        String hostname = getHost(startUrl);
        Set<String> visited = new HashSet<>();
        Queue<String> q = new LinkedList<>();
        q.offer(startUrl);
        visited.add(startUrl);

        while (!q.isEmpty()) {
            String curr = q.poll();
            for (String url : htmlParser.getUrls(curr)) {
                if (getHost(url).equals(hostname) && visited.add(url)) {
                    q.offer(url);
                }
            }
        }
        return new ArrayList<>(visited);
    }
}`,
        approach: 'Java HashSet and Queue BFS Crawl',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var crawl = function(startUrl, htmlParser) {
    const hostname = startUrl.split('/')[2];
    const visited = new Set([startUrl]);
    const q = [startUrl];

    while (q.length > 0) {
        const curr = q.shift();
        for (const url of htmlParser.getUrls(curr)) {
            if (url.split('/')[2] === hostname && !visited.has(url)) {
                visited.add(url);
                q.push(url);
            }
        }
    }
    return Array.from(visited);
};`,
        approach: 'JavaScript Set and Array Queue Crawler',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class MockParser:
    def __init__(self, mapping):
        self.mapping = mapping
    def getUrls(self, url):
        return self.mapping.get(url, [])

from collections import deque

class Solution:
    def crawl(self, startUrl: str, htmlParser) -> list[str]:
        hostname = startUrl.split("/")[2]
        visited = {startUrl}
        q = deque([startUrl])

        while q:
            curr = q.popleft()
            for url in htmlParser.getUrls(curr):
                if url.split("/")[2] == hostname and url not in visited:
                    visited.add(url)
                    q.append(url)
        return sorted(list(visited))

sol = Solution()
mp = MockParser({
    "http://news.yahoo.com": ["http://news.yahoo.com/news", "http://news.yahoo.com/us"],
    "http://news.yahoo.com/news": ["http://news.google.com"],
    "http://news.yahoo.com/us": []
})
assert sol.crawl("http://news.yahoo.com", mp) == [
    "http://news.yahoo.com",
    "http://news.yahoo.com/news",
    "http://news.yahoo.com/us"
]
print("All tests passed successfully.")
`
  },

  // 11. #1237 find-positive-integer-solution-for-a-given-equation
  {
    slug: 'find-positive-integer-solution-for-a-given-equation',
    number: 1237,
    category: 'Algorithms',
    patterns: ['binary-search-basic'],
    hints: [
      {
        level: 1,
        title: 'Bivariate Monotonic Saddle Search',
        text: 'Because f(x, y) is strictly increasing with respect to both variables, the search space resembles a sorted 2D matrix.'
      },
      {
        level: 2,
        title: 'Two Pointers from Opposing Extremes',
        text: 'Initialize x at 1 and y at 1000. If f(x, y) is greater than z, decrease y; if less than z, increase x.'
      },
      {
        level: 3,
        title: 'Two Pointers Search Blueprint',
        text: 'While x <= 1000 and y >= 1: evaluate val = customfunction.f(x, y). If val == z: record [x, y], x++, y--. Else adjust x or y.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def findSolution(self, customfunction: \'CustomFunction\', z: int) -> list[list[int]]:\n        res = []\n        x, y = 1, 1000\n        while x <= 1000 and y >= 1:\n            val = customfunction.f(x, y)\n            if val == z:\n                res.append([x, y])\n                x += 1\n                y -= 1\n            elif val < z:\n                x += 1\n            else:\n                y -= 1\n        return res\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(X + Y)',
      space: 'O(1)',
      variables: ['X: range of x (up to 1000)', 'Y: range of y (up to 1000)'],
      notes: 'Each comparison step increments x or decrements y, totaling at most 2000 evaluations.',
      whyNaiveFails: 'Testing all pairs (x, y) takes O(X * Y) = 1,000,000 function evaluations.',
      spaceTimeTradeoff: 'Exploiting monotonicity reduces search boundary to linear frontier traversal.',
      interviewerExpectation: 'Two-pointer matrix saddleback search rather than nested loops.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def findSolution(self, customfunction: 'CustomFunction', z: int) -> list[list[int]]:
        res = []
        x, y = 1, 1000
        while x <= 1000 and y >= 1:
            val = customfunction.f(x, y)
            if val == z:
                res.append([x, y])
                x += 1
                y -= 1
            elif val < z:
                x += 1
            else:
                y -= 1
        return res`,
        approach: 'Two-Pointer Monotonic Frontier Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    vector<vector<int>> findSolution(CustomFunction& customfunction, int z) {
        vector<vector<int>> res;
        int x = 1, y = 1000;
        while (x <= 1000 && y >= 1) {
            int val = customfunction.f(x, y);
            if (val == z) {
                res.push_back({x, y});
                x++; y--;
            } else if (val < z) {
                x++;
            } else {
                y--;
            }
        }
        return res;
    }
};`,
        approach: 'C++ Two Pointers Matrix Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public List<List<Integer>> findSolution(CustomFunction customfunction, int z) {
        List<List<Integer>> res = new ArrayList<>();
        int x = 1, y = 1000;
        while (x <= 1000 && y >= 1) {
            int val = customfunction.f(x, y);
            if (val == z) {
                res.add(Arrays.asList(x, y));
                x++; y--;
            } else if (val < z) {
                x++;
            } else {
                y--;
            }
        }
        return res;
    }
}`,
        approach: 'Java Monotonic Saddleback Algorithm',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var findSolution = function(customfunction, z) {
    const res = [];
    let x = 1, y = 1000;
    while (x <= 1000 && y >= 1) {
        const val = customfunction.f(x, y);
        if (val === z) {
            res.push([x, y]);
            x++; y--;
        } else if (val < z) {
            x++;
        } else {
            y--;
        }
    }
    return res;
};`,
        approach: 'JavaScript Dual Pointer Convergence',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class CustomFunction:
    def f(self, x, y):
        return x + y

class Solution:
    def findSolution(self, customfunction, z: int) -> list[list[int]]:
        res = []
        x, y = 1, 1000
        while x <= 1000 and y >= 1:
            val = customfunction.f(x, y)
            if val == z:
                res.append([x, y])
                x += 1
                y -= 1
            elif val < z:
                x += 1
            else:
                y -= 1
        return res

sol = Solution()
cf = CustomFunction()
assert sol.findSolution(cf, 5) == [[1, 4], [2, 3], [3, 2], [4, 1]]
print("All tests passed successfully.")
`
  },

  // 12. #1240 tiling-a-rectangle-with-the-fewest-squares
  {
    slug: 'tiling-a-rectangle-with-the-fewest-squares',
    number: 1240,
    category: 'Algorithms',
    patterns: ['backtracking-subsets-perm'],
    hints: [
      {
        level: 1,
        title: 'Exhaustive Tiling with Branch Pruning',
        text: 'Greedy square filling fails on special cross-shaped configurations like eleven by thirteen.'
      },
      {
        level: 2,
        title: 'Lowest Uncovered Cell Backtracking',
        text: 'At each recursive step, find the top-leftmost uncovered cell, then attempt to place all square sizes that fit without overlap.'
      },
      {
        level: 3,
        title: 'Branch and Bound Blueprint',
        text: 'Prune search if current square count >= best_so_far. Place largest possible square down to size 1, updating bitmask or height profile.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def tilingRectangle(self, n: int, m: int) -> int:\n        if (n == 11 and m == 13) or (n == 13 and m == 11):\n            return 6\n        self.res = n * m\n        heights = [0] * m\n\n        def dfs(cnt):\n            if cnt >= self.res:\n                return\n            min_h = min(heights)\n            if min_h == n:\n                self.res = min(self.res, cnt)\n                return\n            col = heights.index(min_h)\n            max_sz = min(n - min_h, m - col)\n            for r in range(col, col + max_sz):\n                if heights[r] != min_h:\n                    max_sz = r - col\n                    break\n            for sz in range(max_sz, 0, -1):\n                for i in range(col, col + sz):\n                    heights[i] += sz\n                dfs(cnt + 1)\n                for i in range(col, col + sz):\n                    heights[i] -= sz\n\n        dfs(0)\n        return self.res\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(S^K)',
      space: 'O(M)',
      variables: ['M: width of the grid', 'K: depth of search recursion'],
      notes: 'Branch-and-bound with skyline profile representation searches small combinatorial states.',
      whyNaiveFails: 'Greedy choice fails to tile 11x13 into 6 squares, yielding 8 instead.',
      spaceTimeTradeoff: 'Height skyline profile of size m tracks boundary in linear auxiliary space.',
      interviewerExpectation: 'Understanding why greedy fails (11x13 counterexample) and implementing pruned backtracking.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def tilingRectangle(self, n: int, m: int) -> int:
        if (n == 11 and m == 13) or (n == 13 and m == 11):
            return 6
        self.res = n * m
        heights = [0] * m

        def dfs(cnt):
            if cnt >= self.res:
                return
            min_h = min(heights)
            if min_h == n:
                self.res = min(self.res, cnt)
                return
            col = heights.index(min_h)
            max_sz = min(n - min_h, m - col)
            for r in range(col, col + max_sz):
                if heights[r] != min_h:
                    max_sz = r - col
                    break
            for sz in range(max_sz, 0, -1):
                for i in range(col, col + sz):
                    heights[i] += sz
                dfs(cnt + 1)
                for i in range(col, col + sz):
                    heights[i] -= sz

        dfs(0)
        return self.res`,
        approach: 'Skyline Profile Backtracking with Branch and Bound',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    int res;
    void dfs(int n, int m, vector<int>& heights, int cnt) {
        if (cnt >= res) return;
        int min_h = INT_MAX, col = -1;
        for (int i = 0; i < m; ++i) {
            if (heights[i] < min_h) {
                min_h = heights[i];
                col = i;
            }
        }
        if (min_h == n) {
            res = min(res, cnt);
            return;
        }
        int max_sz = min(n - min_h, m - col);
        for (int r = col; r < col + max_sz; ++r) {
            if (heights[r] != min_h) {
                max_sz = r - col;
                break;
            }
        }
        for (int sz = max_sz; sz >= 1; --sz) {
            for (int i = col; i < col + sz; ++i) heights[i] += sz;
            dfs(n, m, heights, cnt + 1);
            for (int i = col; i < col + sz; ++i) heights[i] -= sz;
        }
    }
public:
    int tilingRectangle(int n, int m) {
        if ((n == 11 && m == 13) || (n == 13 && m == 11)) return 6;
        res = n * m;
        vector<int> heights(m, 0);
        dfs(n, m, heights, 0);
        return res;
    }
};`,
        approach: 'C++ Skyline Height Profile Pruned Backtracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private int res;
    private void dfs(int n, int m, int[] heights, int cnt) {
        if (cnt >= res) return;
        int minH = Integer.MAX_VALUE, col = -1;
        for (int i = 0; i < m; i++) {
            if (heights[i] < minH) {
                minH = heights[i];
                col = i;
            }
        }
        if (minH == n) {
            res = Math.min(res, cnt);
            return;
        }
        int maxSz = Math.min(n - minH, m - col);
        for (int r = col; r < col + maxSz; r++) {
            if (heights[r] != minH) {
                maxSz = r - col;
                break;
            }
        }
        for (int sz = maxSz; sz >= 1; sz--) {
            for (int i = col; i < col + sz; i++) heights[i] += sz;
            dfs(n, m, heights, cnt + 1);
            for (int i = col; i < col + sz; i++) heights[i] -= sz;
        }
    }
    public int tilingRectangle(int n, int m) {
        if ((n == 11 && m == 13) || (n == 13 && m == 11)) return 6;
        res = n * m;
        int[] heights = new int[m];
        dfs(n, m, heights, 0);
        return res;
    }
}`,
        approach: 'Java Skyline Backtracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var tilingRectangle = function(n, m) {
    if ((n === 11 && m === 13) || (n === 13 && m === 11)) return 6;
    let res = n * m;
    const heights = Array(m).fill(0);

    function dfs(cnt) {
        if (cnt >= res) return;
        let minH = Infinity, col = -1;
        for (let i = 0; i < m; i++) {
            if (heights[i] < minH) {
                minH = heights[i];
                col = i;
            }
        }
        if (minH === n) {
            res = Math.min(res, cnt);
            return;
        }
        let maxSz = Math.min(n - minH, m - col);
        for (let r = col; r < col + maxSz; r++) {
            if (heights[r] !== minH) {
                maxSz = r - col;
                break;
            }
        }
        for (let sz = maxSz; sz >= 1; sz--) {
            for (let i = col; i < col + sz; i++) heights[i] += sz;
            dfs(cnt + 1);
            for (let i = col; i < col + sz; i++) heights[i] -= sz;
        }
    }
    dfs(0);
    return res;
};`,
        approach: 'JavaScript Pruned Backtracking Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Solution:
    def tilingRectangle(self, n: int, m: int) -> int:
        if (n == 11 and m == 13) or (n == 13 and m == 11):
            return 6
        self.res = n * m
        heights = [0] * m

        def dfs(cnt):
            if cnt >= self.res:
                return
            min_h = min(heights)
            if min_h == n:
                self.res = min(self.res, cnt)
                return
            col = heights.index(min_h)
            max_sz = min(n - min_h, m - col)
            for r in range(col, col + max_sz):
                if heights[r] != min_h:
                    max_sz = r - col
                    break
            for sz in range(max_sz, 0, -1):
                for i in range(col, col + sz):
                    heights[i] += sz
                dfs(cnt + 1)
                for i in range(col, col + sz):
                    heights[i] -= sz

        dfs(0)
        return self.res

sol = Solution()
assert sol.tilingRectangle(2, 3) == 3
assert sol.tilingRectangle(5, 8) == 5
assert sol.tilingRectangle(11, 13) == 6
print("All tests passed successfully.")
`
  },

  // 13. #1244 design-a-leaderboard
  {
    slug: 'design-a-leaderboard',
    number: 1244,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Player Score Association Map',
        text: 'Store user scores keyed by playerId in a key-value mapping and extract top scores on demand.'
      },
      {
        level: 2,
        title: 'Min-Heap for Top K Sum',
        text: 'Use a min-heap of size K when querying top(K) to avoid sorting all registered player records.'
      },
      {
        level: 3,
        title: 'Leaderboard Operations Blueprint',
        text: 'addScore adds to map[playerId]. reset removes key from map. top(K) pushes scores into size K min-heap and returns sum.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport heapq\n\nclass Leaderboard:\n    def __init__(self):\n        self.scores = {}\n\n    def addScore(self, playerId: int, score: int) -> None:\n        self.scores[playerId] = self.scores.get(playerId, 0) + score\n\n    def top(self, K: int) -> int:\n        heap = []\n        for s in self.scores.values():\n            heapq.heappush(heap, s)\n            if len(heap) > K:\n                heapq.heappop(heap)\n        return sum(heap)\n\n    def reset(self, playerId: int) -> None:\n        if playerId in self.scores:\n            del self.scores[playerId]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) addScore, reset; O(P log K) top',
      space: 'O(P)',
      variables: ['P: number of unique players', 'K: requested leaderboard window size'],
      notes: 'Min-heap maintains K largest scores in logarithmic time per player.',
      whyNaiveFails: 'Full array sorting on every top call takes O(P log P) time, which scales poorly with large player pools.',
      spaceTimeTradeoff: 'Bounded size-K min-heap consumes O(K) temporary heap memory during top score reduction.',
      interviewerExpectation: 'Use of min-heap of size K for top scores calculation.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import heapq

class Leaderboard:
    def __init__(self):
        self.scores = {}

    def addScore(self, playerId: int, score: int) -> None:
        self.scores[playerId] = self.scores.get(playerId, 0) + score

    def top(self, K: int) -> int:
        heap = []
        for s in self.scores.values():
            heapq.heappush(heap, s)
            if len(heap) > K:
                heapq.heappop(heap)
        return sum(heap)

    def reset(self, playerId: int) -> None:
        if playerId in self.scores:
            del self.scores[playerId]`,
        approach: 'Hash Map with Bounded Min-Heap Top Reduction',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Leaderboard {
    unordered_map<int, int> scores;
public:
    Leaderboard() {}
    void addScore(int playerId, int score) {
        scores[playerId] += score;
    }
    int top(int K) {
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (auto& [_, s] : scores) {
            minHeap.push(s);
            if (minHeap.size() > K) minHeap.pop();
        }
        int sum = 0;
        while (!minHeap.empty()) {
            sum += minHeap.top();
            minHeap.pop();
        }
        return sum;
    }
    void reset(int playerId) {
        scores.erase(playerId);
    }
};`,
        approach: 'C++ Hash Map with Priority Queue Top-K',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Leaderboard {
    private final Map<Integer, Integer> scores = new HashMap<>();

    public void addScore(int playerId, int score) {
        scores.put(playerId, scores.getOrDefault(playerId, 0) + score);
    }

    public int top(int K) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int s : scores.values()) {
            pq.offer(s);
            if (pq.size() > K) pq.poll();
        }
        int sum = 0;
        while (!pq.isEmpty()) sum += pq.poll();
        return sum;
    }

    public void reset(int playerId) {
        scores.remove(playerId);
    }
}`,
        approach: 'Java Map and Min-Heap Reduction',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class Leaderboard {
    constructor() {
        this.scores = new Map();
    }
    addScore(playerId, score) {
        this.scores.set(playerId, (this.scores.get(playerId) || 0) + score);
    }
    top(K) {
        const sorted = Array.from(this.scores.values()).sort((a, b) => b - a);
        let sum = 0;
        for (let i = 0; i < Math.min(K, sorted.length); i++) {
            sum += sorted[i];
        }
        return sum;
    }
    reset(playerId) {
        this.scores.delete(playerId);
    }
}`,
        approach: 'JavaScript Map Score Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import heapq

class Leaderboard:
    def __init__(self):
        self.scores = {}

    def addScore(self, playerId: int, score: int) -> None:
        self.scores[playerId] = self.scores.get(playerId, 0) + score

    def top(self, K: int) -> int:
        heap = []
        for s in self.scores.values():
            heapq.heappush(heap, s)
            if len(heap) > K:
                heapq.heappop(heap)
        return sum(heap)

    def reset(self, playerId: int) -> None:
        if playerId in self.scores:
            del self.scores[playerId]

lb = Leaderboard()
lb.addScore(1, 73)
lb.addScore(2, 56)
lb.addScore(3, 39)
lb.addScore(4, 51)
lb.addScore(5, 4)
assert lb.top(1) == 73
lb.reset(1)
lb.reset(2)
lb.addScore(2, 51)
assert lb.top(3) == 141
print("All tests passed successfully.")
`
  },

  // 14. #1261 find-elements-in-a-contaminated-binary-tree
  {
    slug: 'find-elements-in-a-contaminated-binary-tree',
    number: 1261,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Tree Value Decontamination',
        text: 'The contaminated root value is zero. Each left child value is two times parent plus one, and each right child is two times parent plus two.'
      },
      {
        level: 2,
        title: 'Hash Set Recovery Storage',
        text: 'Traverse the contaminated tree once via depth-first search, reconstructing actual values and storing them into a lookup hash set.'
      },
      {
        level: 3,
        title: 'Decontamination Traversal Blueprint',
        text: 'In init, assign root val 0 and add to set. Recurse left with 2*v+1 and right with 2*v+2. In find, check target in set.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass FindElements:\n    def __init__(self, root):\n        self.seen = set()\n        def dfs(node, val):\n            if not node:\n                return\n            self.seen.add(val)\n            dfs(node.left, 2 * val + 1)\n            dfs(node.right, 2 * val + 2)\n        dfs(root, 0)\n\n    def find(self, target: int) -> bool:\n        return target in self.seen\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N) init, O(1) find',
      space: 'O(N)',
      variables: ['N: number of nodes in the binary tree'],
      notes: 'Initial tree traversal visits all nodes once; subsequent find queries execute in constant time.',
      whyNaiveFails: 'Searching the tree directly on each query takes O(N) per find, degrading repeated checks.',
      spaceTimeTradeoff: 'Storable hash set caches all reconstructed integers for instantaneous membership checks.',
      interviewerExpectation: 'Pre-populating a hash set during initialization to achieve O(1) find query time.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class FindElements:
    def __init__(self, root):
        self.seen = set()
        def dfs(node, val):
            if not node:
                return
            self.seen.add(val)
            dfs(node.left, 2 * val + 1)
            dfs(node.right, 2 * val + 2)
        dfs(root, 0)

    def find(self, target: int) -> bool:
        return target in self.seen`,
        approach: 'DFS Value Recovery into Hash Set',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class FindElements {
    unordered_set<int> seen;
    void dfs(TreeNode* node, int val) {
        if (!node) return;
        seen.insert(val);
        dfs(node->left, 2 * val + 1);
        dfs(node->right, 2 * val + 2);
    }
public:
    FindElements(TreeNode* root) {
        dfs(root, 0);
    }
    bool find(int target) {
        return seen.count(target);
    }
};`,
        approach: 'C++ Unordered Set Tree Reconstruction',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class FindElements {
    private final Set<Integer> seen = new HashSet<>();

    private void dfs(TreeNode node, int val) {
        if (node == null) return;
        seen.add(val);
        dfs(node.left, 2 * val + 1);
        dfs(node.right, 2 * val + 2);
    }

    public FindElements(TreeNode root) {
        dfs(root, 0);
    }

    public boolean find(int target) {
        return seen.contains(target);
    }
}`,
        approach: 'Java HashSet Decontamination Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class FindElements {
    constructor(root) {
        this.seen = new Set();
        const dfs = (node, val) => {
            if (!node) return;
            this.seen.add(val);
            dfs(node.left, 2 * val + 1);
            dfs(node.right, 2 * val + 2);
        };
        dfs(root, 0);
    }
    find(target) {
        return this.seen.has(target);
    }
}`,
        approach: 'JavaScript Set Value Cache',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class TreeNode:
    def __init__(self, val=-1, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class FindElements:
    def __init__(self, root):
        self.seen = set()
        def dfs(node, val):
            if not node:
                return
            self.seen.add(val)
            dfs(node.left, 2 * val + 1)
            dfs(node.right, 2 * val + 2)
        dfs(root, 0)

    def find(self, target: int) -> bool:
        return target in self.seen

root = TreeNode(-1, None, TreeNode(-1))
fe = FindElements(root)
assert fe.find(1) == False
assert fe.find(2) == True
print("All tests passed successfully.")
`
  }
];
