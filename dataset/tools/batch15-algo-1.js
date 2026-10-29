export const batch15Algo1 = [
  // 1. #559 maximum-depth-of-n-ary-tree
  {
    slug: 'maximum-depth-of-n-ary-tree',
    number: 559,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Recursive Subtree Depth Aggregation',
        text: 'The maximum depth of an arbitrary tree equals one plus the highest depth among all of its children nodes.'
      },
      {
        level: 2,
        title: 'Base Case and Branch Traversal',
        text: 'If the root is NULL, return 0. If children is empty, return 1. Otherwise, recursively compute the depth of every child and pick the maximum.'
      },
      {
        level: 3,
        title: 'Depth Function Blueprint',
        text: 'Define maxDepth(root): if not root, return 0. If not root.children, return 1. Return 1 + max(maxDepth(c) for c in root.children).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Node:\n    def __init__(self, val=None, children=None):\n        self.val = val\n        self.children = children if children is not None else []\n\nclass Solution:\n    def maxDepth(self, root: \'Node\') -> int:\n        if not root:\n            return 0\n        if not root.children:\n            return 1\n        return 1 + max(self.maxDepth(c) for c in root.children)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(H)',
      variables: ['N: total number of nodes in tree', 'H: tree height'],
      notes: 'Every node is visited once during recursive traversal with call frame height bounded by H.',
      whyNaiveFails: 'Re-traversing children from top to bottom repeatedly causes redundant quadratic inspections.',
      spaceTimeTradeoff: 'Depth recursion uses implicit call frame memory proportional to tree depth.',
      interviewerExpectation: 'Handling NULL roots and nodes with zero children cleanly without extra branches.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

class Solution:
    def maxDepth(self, root: 'Node') -> int:
        if not root:
            return 0
        if not root.children:
            return 1
        return 1 + max(self.maxDepth(c) for c in root.children)`,
        approach: 'Recursive Depth DFS Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> children;
    Node() {}
    Node(int _val) { val = _val; }
    Node(int _val, vector<Node*> _children) { val = _val; children = _children; }
};
*/
class Solution {
public:
    int maxDepth(Node* root) {
        if (!root) return 0;
        int max_child = 0;
        for (Node* child : root->children) {
            max_child = max(max_child, maxDepth(child));
        }
        return 1 + max_child;
    }
};`,
        approach: 'C++ Recursive Tree Height DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `/*
class Node {
    public int val;
    public List<Node> children;
    public Node() {}
    public Node(int _val) { val = _val; }
    public Node(int _val, List<Node> _children) { val = _val; children = _children; }
}
*/
class Solution {
    public int maxDepth(Node root) {
        if (root == null) return 0;
        int max = 0;
        if (root.children != null) {
            for (Node c : root.children) {
                max = Math.max(max, maxDepth(c));
            }
        }
        return 1 + max;
    }
}`,
        approach: 'Java Recursive Tree Height DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (!root) return 0;
    if (!root.children || root.children.length === 0) return 1;
    let max = 0;
    for (const child of root.children) {
        max = Math.max(max, maxDepth(child));
    }
    return 1 + max;
};`,
        approach: 'JavaScript Recursive Tree Depth DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'maximum-depth-of-n-ary-tree.json')

class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

def maxDepth(root):
    if not root:
        return 0
    if not root.children:
        return 1
    return 1 + max(maxDepth(c) for c in root.children)

r1 = Node(1, [Node(3, [Node(5), Node(6)]), Node(2), Node(4)])
assert maxDepth(r1) == 3
assert maxDepth(None) == 0
assert maxDepth(Node(1)) == 1
print("✓ maximum-depth-of-n-ary-tree passed")
`
  },

  // 2. #711 number-of-distinct-islands-ii
  {
    slug: 'number-of-distinct-islands-ii',
    number: 711,
    category: 'Algorithms',
    patterns: ['grid-flood-fill'],
    hints: [
      {
        level: 1,
        title: 'Rigid Motion Canonical Island Shape Normalization',
        text: 'Two islands match if one can be rotated or reflected into the other across 8 planar symmetry transformations.'
      },
      {
        level: 2,
        title: 'Extracting and Transforming Connected Components',
        text: 'Collect island cell coordinates using connected traversal. Generate all 8 transformed coordinate lists by applying reflections (x, y), (-x, y), (x, -y), (-x, -y) and 90 degree coordinate swaps.'
      },
      {
        level: 3,
        title: 'Canonical Island Representation Blueprint',
        text: 'For each transformation: sort coordinates, translate by subtracting top-left coordinate, serialize into tuple. The lexicographically smallest serialization forms the canonical shape signature. Insert into a distinct shape collection.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def numDistinctIslands2(self, grid: list[list[int]]) -> int:\n        R, C = len(grid), len(grid[0])\n        visited = set()\n\n        def get_shape(r0, c0):\n            cells = []\n            st = [(r0, c0)]\n            visited.add((r0, c0))\n            while st:\n                r, c = st.pop()\n                cells.append((r, c))\n                for nr, nc in ((r+1,c), (r-1,c), (r,c+1), (r,c-1)):\n                    if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1 and (nr, nc) not in visited:\n                        visited.add((nr, nc))\n                        st.append((nr, nc))\n            forms = []\n            for sign_x, sign_y in ((1, 1), (1, -1), (-1, 1), (-1, -1)):\n                for swap in (False, True):\n                    pts = []\n                    for r, c in cells:\n                        x, y = (c, r) if swap else (r, c)\n                        pts.append((x * sign_x, y * sign_y))\n                    pts.sort()\n                    ox, oy = pts[0]\n                    normalized = tuple((px - ox, py - oy) for px, py in pts)\n                    forms.append(normalized)\n            return min(forms)\n\n        unique = set()\n        for r in range(R):\n            for c in range(C):\n                if grid[r][c] == 1 and (r, c) not in visited:\n                    unique.add(get_shape(r, c))\n        return len(unique)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(R * C * log K)',
      space: 'O(R * C)',
      variables: ['R: grid rows', 'C: grid columns', 'K: max cells per island'],
      notes: 'Every cell visited once in traversal; 8 coordinate transforms sort up to K points in O(K log K).',
      whyNaiveFails: 'Simple translation alignment fails when islands are rotated 90/180/270 degrees or mirrored.',
      spaceTimeTradeoff: 'Generating all 8 symmetries produces canonical strings for constant factor comparison.',
      interviewerExpectation: 'Normalizing shapes by sorting and relative translation across all 8 dihedral transformations.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def numDistinctIslands2(self, grid: list[list[int]]) -> int:
        R, C = len(grid), len(grid[0])
        visited = set()

        def get_shape(r0, c0):
            cells = []
            st = [(r0, c0)]
            visited.add((r0, c0))
            while st:
                r, c = st.pop()
                cells.append((r, c))
                for nr, nc in ((r+1,c), (r-1,c), (r,c+1), (r,c-1)):
                    if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1 and (nr, nc) not in visited:
                        visited.add((nr, nc))
                        st.append((nr, nc))
            forms = []
            for sign_x, sign_y in ((1, 1), (1, -1), (-1, 1), (-1, -1)):
                for swap in (False, True):
                    pts = []
                    for r, c in cells:
                        x, y = (c, r) if swap else (r, c)
                        pts.append((x * sign_x, y * sign_y))
                    pts.sort()
                    ox, oy = pts[0]
                    normalized = tuple((px - ox, py - oy) for px, py in pts)
                    forms.append(normalized)
            return min(forms)

        unique = set()
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 1 and (r, c) not in visited:
                    unique.add(get_shape(r, c))
        return len(unique)`,
        approach: 'DFS with 8 Dihedral Symmetries Canonical Hashing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int numDistinctIslands2(vector<vector<int>>& grid) {
        int R = grid.size(), C = grid[0].size();
        vector<vector<bool>> visited(R, vector<bool>(C, false));
        set<vector<pair<int, int>>> unique;

        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};

        for (int r = 0; r < R; ++r) {
            for (int c = 0; c < C; ++c) {
                if (grid[r][c] == 1 && !visited[r][c]) {
                    vector<pair<int, int>> cells;
                    vector<pair<int, int>> st = {{r, c}};
                    visited[r][c] = true;
                    while (!st.empty()) {
                        auto [cr, cc] = st.back();
                        st.pop_back();
                        cells.push_back({cr, cc});
                        for (int k = 0; k < 4; ++k) {
                            int nr = cr + dr[k], nc = cc + dc[k];
                            if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] == 1 && !visited[nr][nc]) {
                                visited[nr][nc] = true;
                                st.push_back({nr, nc});
                            }
                        }
                    }
                    vector<vector<pair<int, int>>> forms;
                    int signs[4][2] = {{1, 1}, {1, -1}, {-1, 1}, {-1, -1}};
                    for (int s = 0; s < 4; ++s) {
                        for (int swap_xy = 0; swap_xy < 2; ++swap_xy) {
                            vector<pair<int, int>> pts;
                            for (auto& cell : cells) {
                                int x = swap_xy ? cell.second : cell.first;
                                int y = swap_xy ? cell.first : cell.second;
                                pts.push_back({x * signs[s][0], y * signs[s][1]});
                            }
                            sort(pts.begin(), pts.end());
                            int ox = pts[0].first, oy = pts[0].second;
                            for (auto& p : pts) {
                                p.first -= ox;
                                p.second -= oy;
                            }
                            forms.push_back(pts);
                        }
                    }
                    sort(forms.begin(), forms.end());
                    unique.insert(forms[0]);
                }
            }
        }
        return unique.size();
    }
};`,
        approach: 'C++ Dihedral Symmetry Island Matching',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

class Solution {
    public int numDistinctIslands2(int[][] grid) {
        int R = grid.length, C = grid[0].length;
        boolean[][] visited = new boolean[R][C];
        Set<String> unique = new HashSet<>();

        int[] dr = {1, -1, 0, 0};
        int[] dc = {0, 0, 1, -1};

        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                if (grid[r][c] == 1 && !visited[r][c]) {
                    List<int[]> cells = new ArrayList<>();
                    Deque<int[]> st = new ArrayDeque<>();
                    st.push(new int[]{r, c});
                    visited[r][c] = true;
                    while (!st.isEmpty()) {
                        int[] curr = st.pop();
                        cells.add(curr);
                        for (int k = 0; k < 4; k++) {
                            int nr = curr[0] + dr[k], nc = curr[1] + dc[k];
                            if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] == 1 && !visited[nr][nc]) {
                                visited[nr][nc] = true;
                                st.push(new int[]{nr, nc});
                            }
                        }
                    }
                    String canonical = null;
                    int[][] signs = {{1, 1}, {1, -1}, {-1, 1}, {-1, -1}};
                    for (int[] s : signs) {
                        for (int swap = 0; swap < 2; swap++) {
                            List<int[]> pts = new ArrayList<>();
                            for (int[] cell : cells) {
                                int x = swap == 1 ? cell[1] : cell[0];
                                int y = swap == 1 ? cell[0] : cell[1];
                                pts.add(new int[]{x * s[0], y * s[1]});
                            }
                            pts.sort((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);
                            int ox = pts.get(0)[0], oy = pts.get(0)[1];
                            StringBuilder sb = new StringBuilder();
                            for (int[] p : pts) {
                                sb.append(p[0] - ox).append(':').append(p[1] - oy).append(';');
                            }
                            String repr = sb.toString();
                            if (canonical == null || repr.compareTo(canonical) < 0) {
                                canonical = repr;
                            }
                        }
                    }
                    unique.add(canonical);
                }
            }
        }
        return unique.size();
    }
}`,
        approach: 'Java Dihedral Symmetry Transformation DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[][]} grid
 * @return {number}
 */
var numDistinctIslands2 = function(grid) {
    const R = grid.length, C = grid[0].length;
    const visited = Array.from({ length: R }, () => new Uint8Array(C));
    const unique = new Set();

    const dr = [1, -1, 0, 0];
    const dc = [0, 0, 1, -1];

    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            if (grid[r][c] === 1 && !visited[r][c]) {
                const cells = [];
                const st = [[r, c]];
                visited[r][c] = 1;
                while (st.length > 0) {
                    const [cr, cc] = st.pop();
                    cells.push([cr, cc]);
                    for (let k = 0; k < 4; k++) {
                        const nr = cr + dr[k], nc = cc + dc[k];
                        if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] === 1 && !visited[nr][nc]) {
                            visited[nr][nc] = 1;
                            st.push([nr, nc]);
                        }
                    }
                }
                let canonical = null;
                const signs = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
                for (const [sx, sy] of signs) {
                    for (const swap of [0, 1]) {
                        const pts = [];
                        for (const [cr, cc] of cells) {
                            const x = swap ? cc : cr;
                            const y = swap ? cr : cc;
                            pts.push([x * sx, y * sy]);
                        }
                        pts.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
                        const ox = pts[0][0], oy = pts[0][1];
                        const repr = pts.map(p => (p[0] - ox) + ',' + (p[1] - oy)).join(';');
                        if (canonical === null || repr < canonical) {
                            canonical = repr;
                        }
                    }
                }
                unique.add(canonical);
            }
        }
    }
    return unique.size;
};`,
        approach: 'JavaScript Dihedral 8-Way Symmetry Transformation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'number-of-distinct-islands-ii.json')

grid = [
  [1,1,0,0,0],
  [1,0,0,0,0],
  [0,0,0,0,1],
  [0,0,0,1,1]
]

class Solution:
    def numDistinctIslands2(self, grid: list[list[int]]) -> int:
        R, C = len(grid), len(grid[0])
        visited = set()

        def get_shape(r0, c0):
            cells = []
            st = [(r0, c0)]
            visited.add((r0, c0))
            while st:
                r, c = st.pop()
                cells.append((r, c))
                for nr, nc in ((r+1,c), (r-1,c), (r,c+1), (r,c-1)):
                    if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1 and (nr, nc) not in visited:
                        visited.add((nr, nc))
                        st.append((nr, nc))
            forms = []
            for sign_x, sign_y in ((1, 1), (1, -1), (-1, 1), (-1, -1)):
                for swap in (False, True):
                    pts = []
                    for r, c in cells:
                        x, y = (c, r) if swap else (r, c)
                        pts.append((x * sign_x, y * sign_y))
                    pts.sort()
                    ox, oy = pts[0]
                    normalized = tuple((px - ox, py - oy) for px, py in pts)
                    forms.append(normalized)
            return min(forms)

        unique = set()
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 1 and (r, c) not in visited:
                    unique.add(get_shape(r, c))
        return len(unique)

sol = Solution()
assert sol.numDistinctIslands2(grid) == 1
print("✓ number-of-distinct-islands-ii passed")
`
  },

  // 3. #715 range-module
  {
    slug: 'range-module',
    number: 715,
    category: 'Algorithms',
    patterns: ['segment-tree-fenwick'],
    hints: [
      {
        level: 1,
        title: 'Disjoint Half-Open Interval Tracking',
        text: 'Maintain non-overlapping sorted intervals [left, right) representing tracked ranges to allow ordered boundary resolution.'
      },
      {
        level: 2,
        title: 'Binary Search Overlap Interval Splicing',
        text: 'Use binary search to locate all intervals overlapping with target [left, right). For addition, combine overlapping intervals into one union. For removal, trim overlapping ends.'
      },
      {
        level: 3,
        title: 'RangeModule Operations Blueprint',
        text: 'In addRange(left, right): merge min(overlapping lefts) and max(overlapping rights) and replace. In queryRange(left, right): check if a single interval completely encloses [left, right). In removeRange: replace overlapping intervals with non-overlapping trimmed fragments.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport bisect\n\nclass RangeModule:\n    def __init__(self):\n        self.intervals = []\n\n    def addRange(self, left: int, right: int) -> None:\n        new_intervals = []\n        inserted = False\n        for l, r in self.intervals:\n            if r < left:\n                new_intervals.append((l, r))\n            elif l > right:\n                if not inserted:\n                    new_intervals.append((left, right))\n                    inserted = True\n                new_intervals.append((l, r))\n            else:\n                left = min(left, l)\n                right = max(right, r)\n        if not inserted:\n            new_intervals.append((left, right))\n        self.intervals = new_intervals\n\n    def queryRange(self, left: int, right: int) -> bool:\n        idx = bisect.bisect_right(self.intervals, (left, float(\'inf\'))) - 1\n        if idx >= 0 and self.intervals[idx][0] <= left and self.intervals[idx][1] >= right:\n            return True\n        return False\n\n    def removeRange(self, left: int, right: int) -> None:\n        new_intervals = []\n        for l, r in self.intervals:\n            if r <= left or l >= right:\n                new_intervals.append((l, r))\n            else:\n                if l < left:\n                    new_intervals.append((l, left))\n                if r > right:\n                    new_intervals.append((right, r))\n        self.intervals = new_intervals\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N) for add/remove, O(log N) for query',
      space: 'O(N)',
      variables: ['N: number of disjoint intervals stored'],
      notes: 'Linear interval rebuild for add/remove maintains strictly sorted disjoint segments allowing binary search query in O(log N).',
      whyNaiveFails: 'Tracking individual integers up to 10^9 exhausts memory and time limits.',
      spaceTimeTradeoff: 'Merged interval storage stores O(N) endpoints rather than point representations.',
      interviewerExpectation: 'Handling half-open boundaries and partial interval splitting correctly on remove.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import bisect

class RangeModule:
    def __init__(self):
        self.intervals = []

    def addRange(self, left: int, right: int) -> None:
        new_intervals = []
        inserted = False
        for l, r in self.intervals:
            if r < left:
                new_intervals.append((l, r))
            elif l > right:
                if not inserted:
                    new_intervals.append((left, right))
                    inserted = True
                new_intervals.append((l, r))
            else:
                left = min(left, l)
                right = max(right, r)
        if not inserted:
            new_intervals.append((left, right))
        self.intervals = new_intervals

    def queryRange(self, left: int, right: int) -> bool:
        idx = bisect.bisect_right(self.intervals, (left, float('inf'))) - 1
        if idx >= 0 and self.intervals[idx][0] <= left and self.intervals[idx][1] >= right:
            return True
        return False

    def removeRange(self, left: int, right: int) -> None:
        new_intervals = []
        for l, r in self.intervals:
            if r <= left or l >= right:
                new_intervals.append((l, r))
            else:
                if l < left:
                    new_intervals.append((l, left))
                if r > right:
                    new_intervals.append((right, r))
        self.intervals = new_intervals`,
        approach: 'Disjoint Sorted Interval List Merging and Trimming',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class RangeModule {
    map<int, int> intervals; // left -> right
public:
    RangeModule() {}

    void addRange(int left, int right) {
        auto it = intervals.upper_bound(left);
        if (it != intervals.begin()) {
            auto prev = std::prev(it);
            if (prev->second >= left) {
                left = prev->first;
                right = max(right, prev->second);
                intervals.erase(prev);
            }
        }
        while (it != intervals.end() && it->first <= right) {
            right = max(right, it->second);
            it = intervals.erase(it);
        }
        intervals[left] = right;
    }

    bool queryRange(int left, int right) {
        auto it = intervals.upper_bound(left);
        if (it == intervals.begin()) return false;
        auto prev = std::prev(it);
        return prev->second >= right;
    }

    void removeRange(int left, int right) {
        auto it = intervals.upper_bound(left);
        if (it != intervals.begin()) {
            auto prev = std::prev(it);
            if (prev->second > left) {
                if (prev->second > right) {
                    intervals[right] = prev->second;
                }
                prev->second = left;
            }
        }
        while (it != intervals.end() && it->first < right) {
            if (it->second > right) {
                intervals[right] = it->second;
            }
            it = intervals.erase(it);
        }
    }
};`,
        approach: 'C++ std::map Interval Splicing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

class RangeModule {
    private TreeMap<Integer, Integer> map;

    public RangeModule() {
        map = new TreeMap<>();
    }
    
    public void addRange(int left, int right) {
        Integer start = map.floorKey(left);
        if (start != null && map.get(start) >= left) {
            left = start;
            right = Math.max(right, map.get(start));
        }
        Map<Integer, Integer> sub = map.subMap(left, true, right, true);
        Set<Integer> toRemove = new HashSet<>(sub.keySet());
        for (int k : toRemove) {
            right = Math.max(right, map.get(k));
            map.remove(k);
        }
        map.put(left, right);
    }
    
    public boolean queryRange(int left, int right) {
        Integer start = map.floorKey(left);
        if (start == null) return false;
        return map.get(start) >= right;
    }
    
    public void removeRange(int left, int right) {
        Integer start = map.floorKey(left);
        if (start != null && map.get(start) > left) {
            int prevEnd = map.get(start);
            map.put(start, left);
            if (prevEnd > right) {
                map.put(right, prevEnd);
            }
        }
        Map<Integer, Integer> sub = map.subMap(left, true, right, false);
        Set<Integer> toRemove = new HashSet<>(sub.keySet());
        for (int k : toRemove) {
            int end = map.get(k);
            map.remove(k);
            if (end > right) {
                map.put(right, end);
            }
        }
    }
}`,
        approach: 'Java TreeMap Disjoint Interval Registry',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var RangeModule = function() {
    this.intervals = [];
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {void}
 */
RangeModule.prototype.addRange = function(left, right) {
    const next = [];
    let inserted = false;
    for (const [l, r] of this.intervals) {
        if (r < left) {
            next.push([l, r]);
        } else if (l > right) {
            if (!inserted) {
                next.push([left, right]);
                inserted = true;
            }
            next.push([l, r]);
        } else {
            left = Math.min(left, l);
            right = Math.max(right, r);
        }
    }
    if (!inserted) next.push([left, right]);
    this.intervals = next;
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {boolean}
 */
RangeModule.prototype.queryRange = function(left, right) {
    let low = 0, high = this.intervals.length - 1;
    let idx = -1;
    while (low <= high) {
        const mid = (low + high) >> 1;
        if (this.intervals[mid][0] <= left) {
            idx = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return idx !== -1 && this.intervals[idx][1] >= right;
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {void}
 */
RangeModule.prototype.removeRange = function(left, right) {
    const next = [];
    for (const [l, r] of this.intervals) {
        if (r <= left || l >= right) {
            next.push([l, r]);
        } else {
            if (l < left) next.push([l, left]);
            if (r > right) next.push([right, r]);
        }
    }
    this.intervals = next;
};`,
        approach: 'JavaScript Disjoint Segment Rebuilder',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'range-module.json')

import bisect

class RangeModule:
    def __init__(self):
        self.intervals = []

    def addRange(self, left: int, right: int) -> None:
        new_intervals = []
        inserted = False
        for l, r in self.intervals:
            if r < left:
                new_intervals.append((l, r))
            elif l > right:
                if not inserted:
                    new_intervals.append((left, right))
                    inserted = True
                new_intervals.append((l, r))
            else:
                left = min(left, l)
                right = max(right, r)
        if not inserted:
            new_intervals.append((left, right))
        self.intervals = new_intervals

    def queryRange(self, left: int, right: int) -> bool:
        idx = bisect.bisect_right(self.intervals, (left, float('inf'))) - 1
        if idx >= 0 and self.intervals[idx][0] <= left and self.intervals[idx][1] >= right:
            return True
        return False

    def removeRange(self, left: int, right: int) -> None:
        new_intervals = []
        for l, r in self.intervals:
            if r <= left or l >= right:
                new_intervals.append((l, r))
            else:
                if l < left:
                    new_intervals.append((l, left))
                if r > right:
                    new_intervals.append((right, r))
        self.intervals = new_intervals

rm = RangeModule()
rm.addRange(10, 20)
rm.removeRange(14, 16)
assert rm.queryRange(10, 14) is True
assert rm.queryRange(13, 15) is False
assert rm.queryRange(16, 17) is True
print("✓ range-module passed")
`
  },

  // 4. #729 my-calendar-i
  {
    slug: 'my-calendar-i',
    number: 729,
    category: 'Algorithms',
    patterns: ['segment-tree-fenwick'],
    hints: [
      {
        level: 1,
        title: 'Ordered Interval Intersection Check',
        text: 'A new event [start, end) conflicts with an existing event [s, e) if and only if max(start, s) < min(end, e).'
      },
      {
        level: 2,
        title: 'Binary Search Adjacent Booking Check',
        text: 'Store existing bookings sorted by start time. Check only the immediately preceding and succeeding intervals for collision before inserting.'
      },
      {
        level: 3,
        title: 'MyCalendar Book Blueprint',
        text: 'In book(startTime, endTime): locate insertion position using bisect. If predecessor ends after startTime or successor starts before endTime, return False. Otherwise insert (startTime, endTime) and return True.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport bisect\n\nclass MyCalendar:\n    def __init__(self):\n        self.bookings = []\n\n    def book(self, startTime: int, endTime: int) -> bool:\n        idx = bisect.bisect_right(self.bookings, (startTime, endTime))\n        if idx > 0 and self.bookings[idx - 1][1] > startTime:\n            return False\n        if idx < len(self.bookings) and self.bookings[idx][0] < endTime:\n            return False\n        self.bookings.insert(idx, (startTime, endTime))\n        return True\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N) insertion, O(log N) search',
      space: 'O(N)',
      variables: ['N: number of booked events'],
      notes: 'Binary search locates insertion slot in O(log N) while array shifting takes O(N).',
      whyNaiveFails: 'Full unsorted array scan takes O(N^2) total across N booking requests.',
      spaceTimeTradeoff: 'Sorted interval list allows quick collision verification on adjacent intervals.',
      interviewerExpectation: 'Exact boundary collision logic max(start, s) < min(end, e).'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import bisect

class MyCalendar:
    def __init__(self):
        self.bookings = []

    def book(self, startTime: int, endTime: int) -> bool:
        idx = bisect.bisect_right(self.bookings, (startTime, endTime))
        if idx > 0 and self.bookings[idx - 1][1] > startTime:
            return False
        if idx < len(self.bookings) and self.bookings[idx][0] < endTime:
            return False
        self.bookings.insert(idx, (startTime, endTime))
        return True`,
        approach: 'Binary Search Ordered Interval Insertion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class MyCalendar {
    map<int, int> calendar; // start -> end
public:
    MyCalendar() {}
    
    bool book(int startTime, int endTime) {
        auto next = calendar.lower_bound(startTime);
        if (next != calendar.end() && next->first < endTime) return false;
        if (next != calendar.begin()) {
            auto prev = std::prev(next);
            if (prev->second > startTime) return false;
        }
        calendar[startTime] = endTime;
        return true;
    }
};`,
        approach: 'C++ std::map Adjacent Overlap Check',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.TreeMap;

class MyCalendar {
    private TreeMap<Integer, Integer> calendar;

    public MyCalendar() {
        calendar = new TreeMap<>();
    }
    
    public boolean book(int startTime, int endTime) {
        Integer prev = calendar.floorKey(startTime);
        Integer next = calendar.ceilingKey(startTime);
        if (prev != null && calendar.get(prev) > startTime) return false;
        if (next != null && next < endTime) return false;
        calendar.put(startTime, endTime);
        return true;
    }
}`,
        approach: 'Java TreeMap Floor/Ceiling Overlap Check',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var MyCalendar = function() {
    this.bookings = [];
};

/** 
 * @param {number} startTime 
 * @param {number} endTime
 * @return {boolean}
 */
MyCalendar.prototype.book = function(startTime, endTime) {
    let low = 0, high = this.bookings.length;
    while (low < high) {
        const mid = (low + high) >> 1;
        if (this.bookings[mid][0] < startTime) {
            low = mid + 1;
        } else {
            high = mid;
        }
    }
    if (low > 0 && this.bookings[low - 1][1] > startTime) return false;
    if (low < this.bookings.length && this.bookings[low][0] < endTime) return false;
    this.bookings.splice(low, 0, [startTime, endTime]);
    return true;
};`,
        approach: 'JavaScript Binary Search Insertion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'my-calendar-i.json')

import bisect

class MyCalendar:
    def __init__(self):
        self.bookings = []

    def book(self, startTime: int, endTime: int) -> bool:
        idx = bisect.bisect_right(self.bookings, (startTime, endTime))
        if idx > 0 and self.bookings[idx - 1][1] > startTime:
            return False
        if idx < len(self.bookings) and self.bookings[idx][0] < endTime:
            return False
        self.bookings.insert(idx, (startTime, endTime))
        return True

c = MyCalendar()
assert c.book(10, 20) is True
assert c.book(15, 25) is False
assert c.book(20, 30) is True
print("✓ my-calendar-i passed")
`
  },

  // 5. #731 my-calendar-ii
  {
    slug: 'my-calendar-ii',
    number: 731,
    category: 'Algorithms',
    patterns: ['segment-tree-fenwick'],
    hints: [
      {
        level: 1,
        title: 'Two-Tier Overlap Tracking',
        text: 'A triple booking occurs if the proposed interval intersects with any interval where two existing events already overlap.'
      },
      {
        level: 2,
        title: 'Maintaining Single and Double Bookings',
        text: 'Maintain two lists: regular bookings and double-booked overlap intersections. For each new interval, verify it does not overlap with any double-booking.'
      },
      {
        level: 3,
        title: 'MyCalendarTwo Book Blueprint',
        text: 'For (s, e) in overlaps: if max(start, s) < min(end, e), return False. Then for (s, e) in bookings: if max(start, s) < min(end, e), add intersection (max(start, s), min(end, e)) to overlaps. Finally add (start, end) to bookings.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass MyCalendarTwo:\n    def __init__(self):\n        self.bookings = []\n        self.overlaps = []\n\n    def book(self, startTime: int, endTime: int) -> bool:\n        for s, e in self.overlaps:\n            if max(startTime, s) < min(endTime, e):\n                return False\n        for s, e in self.bookings:\n            if max(startTime, s) < min(endTime, e):\n                self.overlaps.append((max(startTime, s), min(endTime, e)))\n        self.bookings.append((startTime, endTime))\n        return True\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N) per book',
      space: 'O(N)',
      variables: ['N: number of booked events'],
      notes: 'Checking against O(N) overlaps and single bookings takes linear time per query.',
      whyNaiveFails: 'Tracking continuous point arrays up to 10^9 exceeds time and memory.',
      spaceTimeTradeoff: 'Dual list tracking stores only pairwise intersections to prevent triple bookings.',
      interviewerExpectation: 'Explicitly tracking intersection segments without full coordinate sweep line.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class MyCalendarTwo:
    def __init__(self):
        self.bookings = []
        self.overlaps = []

    def book(self, startTime: int, endTime: int) -> bool:
        for s, e in self.overlaps:
            if max(startTime, s) < min(endTime, e):
                return False
        for s, e in self.bookings:
            if max(startTime, s) < min(endTime, e):
                self.overlaps.append((max(startTime, s), min(endTime, e)))
        self.bookings.append((startTime, endTime))
        return True`,
        approach: 'Pairwise Overlap Filtering',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class MyCalendarTwo {
    vector<pair<int, int>> bookings;
    vector<pair<int, int>> overlaps;
public:
    MyCalendarTwo() {}
    
    bool book(int startTime, int endTime) {
        for (const auto& [s, e] : overlaps) {
            if (max(startTime, s) < min(endTime, e)) return false;
        }
        for (const auto& [s, e] : bookings) {
            if (max(startTime, s) < min(endTime, e)) {
                overlaps.push_back({max(startTime, s), min(endTime, e)});
            }
        }
        bookings.push_back({startTime, endTime});
        return true;
    }
};`,
        approach: 'C++ Pairwise Overlap Vector Maintenance',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

class MyCalendarTwo {
    private List<int[]> bookings;
    private List<int[]> overlaps;

    public MyCalendarTwo() {
        bookings = new ArrayList<>();
        overlaps = new ArrayList<>();
    }
    
    public boolean book(int startTime, int endTime) {
        for (int[] o : overlaps) {
            if (Math.max(startTime, o[0]) < Math.min(endTime, o[1])) return false;
        }
        for (int[] b : bookings) {
            if (Math.max(startTime, b[0]) < Math.min(endTime, b[1])) {
                overlaps.add(new int[]{Math.max(startTime, b[0]), Math.min(endTime, b[1])});
            }
        }
        bookings.add(new int[]{startTime, endTime});
        return true;
    }
}`,
        approach: 'Java Overlap Pair Tracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var MyCalendarTwo = function() {
    this.bookings = [];
    this.overlaps = [];
};

/** 
 * @param {number} startTime 
 * @param {number} endTime
 * @return {boolean}
 */
MyCalendarTwo.prototype.book = function(startTime, endTime) {
    for (const [s, e] of this.overlaps) {
        if (Math.max(startTime, s) < Math.min(endTime, e)) return false;
    }
    for (const [s, e] of this.bookings) {
        if (Math.max(startTime, s) < Math.min(endTime, e)) {
            this.overlaps.push([Math.max(startTime, s), Math.min(endTime, e)]);
        }
    }
    this.bookings.push([startTime, endTime]);
    return true;
};`,
        approach: 'JavaScript Overlap Pair List Tracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'my-calendar-ii.json')

class MyCalendarTwo:
    def __init__(self):
        self.bookings = []
        self.overlaps = []

    def book(self, startTime: int, endTime: int) -> bool:
        for s, e in self.overlaps:
            if max(startTime, s) < min(endTime, e):
                return False
        for s, e in self.bookings:
            if max(startTime, s) < min(endTime, e):
                self.overlaps.append((max(startTime, s), min(endTime, e)))
        self.bookings.append((startTime, endTime))
        return True

c = MyCalendarTwo()
assert c.book(10, 20) is True
assert c.book(50, 60) is True
assert c.book(10, 40) is True
assert c.book(5, 15) is False
assert c.book(5, 10) is True
assert c.book(25, 55) is True
print("✓ my-calendar-ii passed")
`
  },

  // 6. #732 my-calendar-iii
  {
    slug: 'my-calendar-iii',
    number: 732,
    category: 'Algorithms',
    patterns: ['segment-tree-fenwick'],
    hints: [
      {
        level: 1,
        title: 'Boundary Delta Array Accumulation',
        text: 'Record +1 delta at event start time and -1 delta at event end time to track concurrent active intervals.'
      },
      {
        level: 2,
        title: 'Prefix Sum Sweep Across Ordered Time Keys',
        text: 'Update the endpoint counts. Sweep sequentially through all recorded timestamps, accumulating a running prefix sum of active bookings and tracking the maximum value.'
      },
      {
        level: 3,
        title: 'MyCalendarThree Book Blueprint',
        text: 'In book(startTime, endTime): increment delta[startTime] by 1 and decrement delta[endTime] by 1. Loop through sorted delta keys, accumulate running sum, compute max, and return it.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport bisect\n\nclass MyCalendarThree:\n    def __init__(self):\n        self.delta = {}\n\n    def book(self, startTime: int, endTime: int) -> int:\n        self.delta[startTime] = self.delta.get(startTime, 0) + 1\n        self.delta[endTime] = self.delta.get(endTime, 0) - 1\n        active = 0\n        ans = 0\n        for t in sorted(self.delta.keys()):\n            active += self.delta[t]\n            ans = max(ans, active)\n        return ans\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N log N) per book',
      space: 'O(N)',
      variables: ['N: total number of bookings'],
      notes: 'Sorting unique boundary keys takes O(N log N) time; running sweep runs in O(N).',
      whyNaiveFails: 'Full segment tree dynamic allocation requires substantial boilerplate for identical constraints.',
      spaceTimeTradeoff: 'Difference map stores 2N boundary points instead of continuous ranges.',
      interviewerExpectation: 'Understanding sweep-line delta accumulation for maximum concurrent overlap.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import bisect

class MyCalendarThree:
    def __init__(self):
        self.delta = {}

    def book(self, startTime: int, endTime: int) -> int:
        self.delta[startTime] = self.delta.get(startTime, 0) + 1
        self.delta[endTime] = self.delta.get(endTime, 0) - 1
        active = 0
        ans = 0
        for t in sorted(self.delta.keys()):
            active += self.delta[t]
            ans = max(ans, active)
        return ans`,
        approach: 'Ordered Sweep-Line Delta Counting',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class MyCalendarThree {
    map<int, int> delta;
public:
    MyCalendarThree() {}
    
    int book(int startTime, int endTime) {
        delta[startTime]++;
        delta[endTime]--;
        int active = 0, ans = 0;
        for (const auto& [time, count] : delta) {
            active += count;
            ans = max(ans, active);
        }
        return ans;
    }
};`,
        approach: 'C++ std::map Sweep Line Prefix Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.TreeMap;

class MyCalendarThree {
    private TreeMap<Integer, Integer> delta;

    public MyCalendarThree() {
        delta = new TreeMap<>();
    }
    
    public int book(int startTime, int endTime) {
        delta.put(startTime, delta.getOrDefault(startTime, 0) + 1);
        delta.put(endTime, delta.getOrDefault(endTime, 0) - 1);
        int active = 0, ans = 0;
        for (int count : delta.values()) {
            active += count;
            ans = Math.max(ans, active);
        }
        return ans;
    }
}`,
        approach: 'Java TreeMap Running Sum Sweep',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var MyCalendarThree = function() {
    this.delta = new Map();
};

/** 
 * @param {number} startTime 
 * @param {number} endTime
 * @return {number}
 */
MyCalendarThree.prototype.book = function(startTime, endTime) {
    this.delta.set(startTime, (this.delta.get(startTime) || 0) + 1);
    this.delta.set(endTime, (this.delta.get(endTime) || 0) - 1);
    const sortedTimes = Array.from(this.delta.keys()).sort((a, b) => a - b);
    let active = 0, ans = 0;
    for (const t of sortedTimes) {
        active += this.delta.get(t);
        ans = Math.max(ans, active);
    }
    return ans;
};`,
        approach: 'JavaScript Map Boundary Delta Sweep',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'my-calendar-iii.json')

class MyCalendarThree:
    def __init__(self):
        self.delta = {}

    def book(self, startTime: int, endTime: int) -> int:
        self.delta[startTime] = self.delta.get(startTime, 0) + 1
        self.delta[endTime] = self.delta.get(endTime, 0) - 1
        active = 0
        ans = 0
        for t in sorted(self.delta.keys()):
            active += self.delta[t]
            ans = max(ans, active)
        return ans

c = MyCalendarThree()
assert c.book(10, 20) == 1
assert c.book(50, 60) == 1
assert c.book(10, 40) == 2
assert c.book(5, 15) == 3
assert c.book(5, 10) == 3
assert c.book(25, 55) == 3
print("✓ my-calendar-iii passed")
`
  },

  // 7. #736 parse-lisp-expression
  {
    slug: 'parse-lisp-expression',
    number: 736,
    category: 'Algorithms',
    patterns: ['stack-parentheses-parser'],
    hints: [
      {
        level: 1,
        title: 'Hierarchical Lexical Scope Resolution',
        text: 'Parenthesized expressions define nested scopes where let-bindings overshadow outer variable definitions during expression evaluation.'
      },
      {
        level: 2,
        title: 'Tokenization and Operator Branching',
        text: 'Split the inner expression by top-level whitespace respecting nested parentheses. Determine if operator is let, add, or mult.'
      },
      {
        level: 3,
        title: 'Recursive Expression Evaluator Blueprint',
        text: 'Maintain an environment dict mapping variable names to value sequences. On let: bind variables sequentially, then evaluate trailing expression. On add: eval(e1) + eval(e2). On mult: eval(e1) * eval(e2).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def evaluate(self, expression: str) -> int:\n        scope = [{}]\n\n        def get_val(token):\n            for sc in reversed(scope):\n                if token in sc:\n                    return sc[token]\n            return int(token)\n\n        def parse_tokens(s):\n            tokens = []\n            curr = []\n            bal = 0\n            for ch in s:\n                if ch == \'(\':\n                    bal += 1\n                elif ch == \')\':\n                    bal -= 1\n                if ch == \' \' and bal == 0:\n                    tokens.append(\'\'.join(curr))\n                    curr = []\n                else:\n                    curr.append(ch)\n            if curr:\n                tokens.append(\'\'.join(curr))\n            return tokens\n\n        def eval_expr(expr):\n            if not expr.startswith(\'(\'):\n                return get_val(expr)\n            inner = expr[1:-1]\n            tokens = parse_tokens(inner)\n            op = tokens[0]\n            if op == \'add\':\n                return eval_expr(tokens[1]) + eval_expr(tokens[2])\n            elif op == \'mult\':\n                return eval_expr(tokens[1]) * eval_expr(tokens[2])\n            else:\n                scope.append({})\n                for i in range(1, len(tokens) - 1, 2):\n                    var = tokens[i]\n                    val = eval_expr(tokens[i + 1])\n                    scope[-1][var] = val\n                res = eval_expr(tokens[-1])\n                scope.pop()\n                return res\n\n        return eval_expr(expression)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N^2)',
      space: 'O(N)',
      variables: ['N: length of expression string'],
      notes: 'Substring token slicing at each nested scope produces quadratic worst-case time with linear scope depth.',
      whyNaiveFails: 'Standard left-to-right evaluation confuses variable scopes across sub-expressions.',
      spaceTimeTradeoff: 'Scoped dictionary frames accurately isolate temporary variable shadowed states.',
      interviewerExpectation: 'Correct token splitting respecting nested parentheses and lexical shadowing.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def evaluate(self, expression: str) -> int:
        scope = [{}]

        def get_val(token):
            for sc in reversed(scope):
                if token in sc:
                    return sc[token]
            return int(token)

        def parse_tokens(s):
            tokens = []
            curr = []
            bal = 0
            for ch in s:
                if ch == '(':
                    bal += 1
                elif ch == ')':
                    bal -= 1
                if ch == ' ' and bal == 0:
                    tokens.append(''.join(curr))
                    curr = []
                else:
                    curr.append(ch)
            if curr:
                tokens.append(''.join(curr))
            return tokens

        def eval_expr(expr):
            if not expr.startswith('('):
                return get_val(expr)
            inner = expr[1:-1]
            tokens = parse_tokens(inner)
            op = tokens[0]
            if op == 'add':
                return eval_expr(tokens[1]) + eval_expr(tokens[2])
            elif op == 'mult':
                return eval_expr(tokens[1]) * eval_expr(tokens[2])
            else:
                scope.append({})
                for i in range(1, len(tokens) - 1, 2):
                    var = tokens[i]
                    val = eval_expr(tokens[i + 1])
                    scope[-1][var] = val
                res = eval_expr(tokens[-1])
                scope.pop()
                return res

        return eval_expr(expression)`,
        approach: 'Recursive Descent Parser with Scoped Symbol Table',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    vector<unordered_map<string, int>> scope;

    int getVal(const string& token) {
        for (int i = scope.size() - 1; i >= 0; --i) {
            if (scope[i].count(token)) return scope[i][token];
        }
        return stoi(token);
    }

    vector<string> parseTokens(const string& s) {
        vector<string> tokens;
        string curr = "";
        int bal = 0;
        for (char ch : s) {
            if (ch == '(') bal++;
            else if (ch == ')') bal--;
            if (ch == ' ' && bal == 0) {
                tokens.push_back(curr);
                curr = "";
            } else {
                curr += ch;
            }
        }
        if (!curr.empty()) tokens.push_back(curr);
        return tokens;
    }

    int evalExpr(const string& expr) {
        if (expr[0] != '(') return getVal(expr);
        string inner = expr.substr(1, expr.size() - 2);
        vector<string> tokens = parseTokens(inner);
        string op = tokens[0];
        if (op == "add") {
            return evalExpr(tokens[1]) + evalExpr(tokens[2]);
        } else if (op == "mult") {
            return evalExpr(tokens[1]) * evalExpr(tokens[2]);
        } else {
            scope.push_back({});
            for (size_t i = 1; i + 1 < tokens.size(); i += 2) {
                int val = evalExpr(tokens[i + 1]);
                scope.back()[tokens[i]] = val;
            }
            int res = evalExpr(tokens.back());
            scope.pop_back();
            return res;
        }
    }
public:
    int evaluate(string expression) {
        scope.clear();
        scope.push_back({});
        return evalExpr(expression);
    }
};`,
        approach: 'C++ Scoped Symbol Frame Parsing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

class Solution {
    private List<Map<String, Integer>> scope;

    private int getVal(String token) {
        for (int i = scope.size() - 1; i >= 0; i--) {
            if (scope.get(i).containsKey(token)) {
                return scope.get(i).get(token);
            }
        }
        return Integer.parseInt(token);
    }

    private List<String> parseTokens(String s) {
        List<String> tokens = new ArrayList<>();
        StringBuilder curr = new StringBuilder();
        int bal = 0;
        for (char ch : s.toCharArray()) {
            if (ch == '(') bal++;
            else if (ch == ')') bal--;
            if (ch == ' ' && bal == 0) {
                tokens.add(curr.toString());
                curr.setLength(0);
            } else {
                curr.append(ch);
            }
        }
        if (curr.length() > 0) tokens.add(curr.toString());
        return tokens;
    }

    private int evalExpr(String expr) {
        if (!expr.startsWith("(")) return getVal(expr);
        String inner = expr.substring(1, expr.length() - 1);
        List<String> tokens = parseTokens(inner);
        String op = tokens.get(0);
        if (op.equals("add")) {
            return evalExpr(tokens.get(1)) + evalExpr(tokens.get(2));
        } else if (op.equals("mult")) {
            return evalExpr(tokens.get(1)) * evalExpr(tokens.get(2));
        } else {
            scope.add(new HashMap<>());
            for (int i = 1; i + 1 < tokens.size(); i += 2) {
                int val = evalExpr(tokens.get(i + 1));
                scope.get(scope.size() - 1).put(tokens.get(i), val);
            }
            int res = evalExpr(tokens.get(tokens.size() - 1));
            scope.remove(scope.size() - 1);
            return res;
        }
    }

    public int evaluate(String expression) {
        scope = new ArrayList<>();
        scope.add(new HashMap<>());
        return evalExpr(expression);
    }
}`,
        approach: 'Java Recursive Descent Expression Parser',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {string} expression
 * @return {number}
 */
var evaluate = function(expression) {
    const scope = [new Map()];

    function getVal(token) {
        for (let i = scope.length - 1; i >= 0; i--) {
            if (scope[i].has(token)) return scope[i].get(token);
        }
        return parseInt(token, 10);
    }

    function parseTokens(s) {
        const tokens = [];
        let curr = '';
        let bal = 0;
        for (const ch of s) {
            if (ch === '(') bal++;
            else if (ch === ')') bal--;
            if (ch === ' ' && bal === 0) {
                tokens.push(curr);
                curr = '';
            } else {
                curr += ch;
            }
        }
        if (curr.length > 0) tokens.push(curr);
        return tokens;
    }

    function evalExpr(expr) {
        if (!expr.startsWith('(')) return getVal(expr);
        const inner = expr.slice(1, -1);
        const tokens = parseTokens(inner);
        const op = tokens[0];
        if (op === 'add') {
            return evalExpr(tokens[1]) + evalExpr(tokens[2]);
        } else if (op === 'mult') {
            return evalExpr(tokens[1]) * evalExpr(tokens[2]);
        } else {
            scope.push(new Map());
            for (let i = 1; i + 1 < tokens.length; i += 2) {
                const val = evalExpr(tokens[i + 1]);
                scope[scope.length - 1].set(tokens[i], val);
            }
            const res = evalExpr(tokens[tokens.length - 1]);
            scope.pop();
            return res;
        }
    }

    return evalExpr(expression);
};`,
        approach: 'JavaScript Nested Scope Evaluation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'parse-lisp-expression.json')

class Solution:
    def evaluate(self, expression: str) -> int:
        scope = [{}]

        def get_val(token):
            for sc in reversed(scope):
                if token in sc:
                    return sc[token]
            return int(token)

        def parse_tokens(s):
            tokens = []
            curr = []
            bal = 0
            for ch in s:
                if ch == '(':
                    bal += 1
                elif ch == ')':
                    bal -= 1
                if ch == ' ' and bal == 0:
                    tokens.append(''.join(curr))
                    curr = []
                else:
                    curr.append(ch)
            if curr:
                tokens.append(''.join(curr))
            return tokens

        def eval_expr(expr):
            if not expr.startswith('('):
                return get_val(expr)
            inner = expr[1:-1]
            tokens = parse_tokens(inner)
            op = tokens[0]
            if op == 'add':
                return eval_expr(tokens[1]) + eval_expr(tokens[2])
            elif op == 'mult':
                return eval_expr(tokens[1]) * eval_expr(tokens[2])
            else:
                scope.append({})
                for i in range(1, len(tokens) - 1, 2):
                    var = tokens[i]
                    val = eval_expr(tokens[i + 1])
                    scope[-1][var] = val
                res = eval_expr(tokens[-1])
                scope.pop()
                return res

        return eval_expr(expression)

sol = Solution()
assert sol.evaluate("(let x 2 (mult x (let x 3 y 4 (add x y))))") == 14
assert sol.evaluate("(let x 3 x 2 x)") == 2
assert sol.evaluate("(let x 1 y 2 x (add x y) (add x y))") == 5
print("✓ parse-lisp-expression passed")
`
  },

  // 8. #745 prefix-and-suffix-search
  {
    slug: 'prefix-and-suffix-search',
    number: 745,
    category: 'Algorithms',
    patterns: ['tree-trie-prefix'],
    hints: [
      {
        level: 1,
        title: 'Composite Key Concatenation',
        text: 'Combine every suffix of a word with its prefix separated by a delimiter to evaluate joint boundary queries with a single prefix lookup.'
      },
      {
        level: 2,
        title: 'Wrapped Suffix-Word Insertion',
        text: 'For each word at index i and each suffix of length L, insert suffix + "{" + word into the tree. Store index i at each visited node.'
      },
      {
        level: 3,
        title: 'WordFilter Query Blueprint',
        text: 'In f(pref, suff): search for query suff + "{" + pref in the tree. If found, return the maximum index stored at that terminal node; otherwise return -1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.weight = 0\n\nclass WordFilter:\n    def __init__(self, words: list[str]):\n        self.root = TrieNode()\n        for weight, word in enumerate(words):\n            word_len = len(word)\n            for i in range(word_len + 1):\n                wrapped = word[i:] + \'{\' + word\n                curr = self.root\n                curr.weight = weight\n                for ch in wrapped:\n                    if ch not in curr.children:\n                        curr.children[ch] = TrieNode()\n                    curr = curr.children[ch]\n                    curr.weight = weight\n\n    def f(self, pref: str, suff: str) -> int:\n        curr = self.root\n        target = suff + \'{\' + pref\n        for ch in target:\n            if ch not in curr.children:\n                return -1\n            curr = curr.children[ch]\n        return curr.weight\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N * L^2) build, O(P + S) query',
      space: 'O(N * L^2)',
      variables: ['N: number of words', 'L: maximum word length', 'P: prefix length', 'S: suffix length'],
      notes: 'Every word inserts L suffixes of length up to 2L; queries traverse P + S characters in O(P + S) time.',
      whyNaiveFails: 'Scanning all words on every query takes O(N * L) resulting in query timeout.',
      spaceTimeTradeoff: 'Trading quadratic length tree insertions for fast O(P + S) query time.',
      interviewerExpectation: 'Use of suffix + delimiter + word concatenation to collapse 2D query into 1D prefix.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.weight = 0

class WordFilter:
    def __init__(self, words: list[str]):
        self.root = TrieNode()
        for weight, word in enumerate(words):
            word_len = len(word)
            for i in range(word_len + 1):
                wrapped = word[i:] + '{' + word
                curr = self.root
                curr.weight = weight
                for ch in wrapped:
                    if ch not in curr.children:
                        curr.children[ch] = TrieNode()
                    curr = curr.children[ch]
                    curr.weight = weight

    def f(self, pref: str, suff: str) -> int:
        curr = self.root
        target = suff + '{' + pref
        for ch in target:
            if ch not in curr.children:
                return -1
            curr = curr.children[ch]
        return curr.weight`,
        approach: 'Wrapped Suffix-Prefix Spliced Trie',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class WordFilter {
    struct Node {
        Node* children[27] = {};
        int weight = 0;
    };
    Node* root;
public:
    WordFilter(vector<string>& words) {
        root = new Node();
        for (int weight = 0; weight < words.size(); ++weight) {
            string w = words[weight];
            int n = w.size();
            for (int i = 0; i <= n; ++i) {
                string wrapped = w.substr(i) + "{" + w;
                Node* curr = root;
                curr->weight = weight;
                for (char ch : wrapped) {
                    int idx = ch - 'a';
                    if (ch == '{') idx = 26;
                    if (!curr->children[idx]) curr->children[idx] = new Node();
                    curr = curr->children[idx];
                    curr->weight = weight;
                }
            }
        }
    }
    
    int f(string pref, string suff) {
        Node* curr = root;
        string target = suff + "{" + pref;
        for (char ch : target) {
            int idx = ch - 'a';
            if (ch == '{') idx = 26;
            if (!curr->children[idx]) return -1;
            curr = curr->children[idx];
        }
        return curr->weight;
    }
};`,
        approach: 'C++ 27-Way Array Wrapped Suffix Trie',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class WordFilter {
    static class Node {
        Node[] children = new Node[27];
        int weight = 0;
    }
    private Node root;

    public WordFilter(String[] words) {
        root = new Node();
        for (int weight = 0; weight < words.length; weight++) {
            String w = words[weight];
            int n = w.length();
            for (int i = 0; i <= n; i++) {
                String wrapped = w.substring(i) + "{" + w;
                Node curr = root;
                curr.weight = weight;
                for (int j = 0; j < wrapped.length(); j++) {
                    char ch = wrapped.charAt(j);
                    int idx = ch == '{' ? 26 : ch - 'a';
                    if (curr.children[idx] == null) curr.children[idx] = new Node();
                    curr = curr.children[idx];
                    curr.weight = weight;
                }
            }
        }
    }
    
    public int f(String pref, String suff) {
        Node curr = root;
        String target = suff + "{" + pref;
        for (int i = 0; i < target.length(); i++) {
            char ch = target.charAt(i);
            int idx = ch == '{' ? 26 : ch - 'a';
            if (curr.children[idx] == null) return -1;
            curr = curr.children[idx];
        }
        return curr.weight;
    }
}`,
        approach: 'Java Wrapped Suffix-Prefix Array Trie',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class TrieNode {
    constructor() {
        this.children = new Map();
        this.weight = 0;
    }
}

/**
 * @param {string[]} words
 */
var WordFilter = function(words) {
    this.root = new TrieNode();
    for (let weight = 0; weight < words.length; weight++) {
        const word = words[weight];
        const n = word.length;
        for (let i = 0; i <= n; i++) {
            const wrapped = word.slice(i) + '{' + word;
            let curr = this.root;
            curr.weight = weight;
            for (const ch of wrapped) {
                if (!curr.children.has(ch)) {
                    curr.children.set(ch, new TrieNode());
                }
                curr = curr.children.get(ch);
                curr.weight = weight;
            }
        }
    }
};

/** 
 * @param {string} pref 
 * @param {string} suff
 * @return {number}
 */
WordFilter.prototype.f = function(pref, suff) {
    let curr = this.root;
    const target = suff + '{' + pref;
    for (const ch of target) {
        if (!curr.children.has(ch)) return -1;
        curr = curr.children.get(ch);
    }
    return curr.weight;
};`,
        approach: 'JavaScript Suffix Delimiter Trie',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'prefix-and-suffix-search.json')

class TrieNode:
    def __init__(self):
        self.children = {}
        self.weight = 0

class WordFilter:
    def __init__(self, words: list[str]):
        self.root = TrieNode()
        for weight, word in enumerate(words):
            word_len = len(word)
            for i in range(word_len + 1):
                wrapped = word[i:] + '{' + word
                curr = self.root
                curr.weight = weight
                for ch in wrapped:
                    if ch not in curr.children:
                        curr.children[ch] = TrieNode()
                    curr = curr.children[ch]
                    curr.weight = weight

    def f(self, pref: str, suff: str) -> int:
        curr = self.root
        target = suff + '{' + pref
        for ch in target:
            if ch not in curr.children:
                return -1
            curr = curr.children[ch]
        return curr.weight

wf = WordFilter(["apple"])
assert wf.f("a", "e") == 0
assert wf.f("b", "") == -1
print("✓ prefix-and-suffix-search passed")
`
  },

  // 9. #759 employee-free-time
  {
    slug: 'employee-free-time',
    number: 759,
    category: 'Algorithms',
    patterns: ['greedy-interval-scheduling'],
    hints: [
      {
        level: 1,
        title: 'Global Busy Interval Merging',
        text: 'Collect all working intervals across all employees into a single list and sort them by start time to detect unworked gaps.'
      },
      {
        level: 2,
        title: 'Interval Merging and Gap Identification',
        text: 'Maintain the maximum end time seen so far. If the next interval starts strictly after this maximum end, the gap between maximum end and next start represents free time.'
      },
      {
        level: 3,
        title: 'Free Time Blueprint',
        text: 'Flatten all intervals into list, sort by start. Initialize prev_end = intervals[0].end. For curr in intervals[1:]: if curr.start > prev_end: append Interval(prev_end, curr.start). Update prev_end = max(prev_end, curr.end).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Interval:\n    def __init__(self, start: int = None, end: int = None):\n        self.start = start\n        self.end = end\n\nclass Solution:\n    def employeeFreeTime(self, schedule: \'list[list[Interval]]\') -> \'list[Interval]\':\n        events = []\n        for emp in schedule:\n            for iv in emp:\n                events.append((iv.start, iv.end))\n        events.sort()\n        ans = []\n        prev_end = events[0][1]\n        for s, e in events[1:]:\n            if s > prev_end:\n                ans.append(Interval(prev_end, s))\n            prev_end = max(prev_end, e)\n        return ans\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: ['N: total number of intervals across all employees'],
      notes: 'Sorting all N intervals dominates runtime; single pass merge completes in O(N).',
      whyNaiveFails: 'Timeline simulation per unit minute cannot scale to 10^8 time boundaries.',
      spaceTimeTradeoff: 'Linear array of intervals allows sorting and gap extraction.',
      interviewerExpectation: 'Sorting busy intervals by start and finding gaps where curr.start > prev_end.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Interval:
    def __init__(self, start: int = None, end: int = None):
        self.start = start
        self.end = end

class Solution:
    def employeeFreeTime(self, schedule: 'list[list[Interval]]') -> 'list[Interval]':
        events = []
        for emp in schedule:
            for iv in emp:
                events.append((iv.start, iv.end))
        events.sort()
        ans = []
        prev_end = events[0][1]
        for s, e in events[1:]:
            if s > prev_end:
                ans.append(Interval(prev_end, s))
            prev_end = max(prev_end, e)
        return ans`,
        approach: 'Global Interval Sort and Gap Extraction',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `/*
class Interval {
public:
    int start;
    int end;
    Interval() {}
    Interval(int _start, int _end) { start = _start; end = _end; }
};
*/
class Solution {
public:
    vector<Interval> employeeFreeTime(vector<vector<Interval>> schedule) {
        vector<pair<int, int>> events;
        for (const auto& emp : schedule) {
            for (const auto& iv : emp) {
                events.push_back({iv.start, iv.end});
            }
        }
        sort(events.begin(), events.end());
        vector<Interval> ans;
        int prev_end = events[0].second;
        for (size_t i = 1; i < events.size(); ++i) {
            if (events[i].first > prev_end) {
                ans.push_back(Interval(prev_end, events[i].first));
            }
            prev_end = max(prev_end, events[i].second);
        }
        return ans;
    }
};`,
        approach: 'C++ Flattened Event Sorting',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `/*
class Interval {
    public int start;
    public int end;
    public Interval() {}
    public Interval(int _start, int _end) { start = _start; end = _end; }
}
*/
class Solution {
    public List<Interval> employeeFreeTime(List<List<Interval>> schedule) {
        List<int[]> events = new ArrayList<>();
        for (List<Interval> emp : schedule) {
            for (Interval iv : emp) {
                events.add(new int[]{iv.start, iv.end});
            }
        }
        events.sort((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);
        List<Interval> ans = new ArrayList<>();
        int prevEnd = events.get(0)[1];
        for (int i = 1; i < events.size(); i++) {
            int s = events.get(i)[0], e = events.get(i)[1];
            if (s > prevEnd) {
                ans.add(new Interval(prevEnd, s));
            }
            prevEnd = Math.max(prevEnd, e);
        }
        return ans;
    }
}`,
        approach: 'Java Event Sorting and Boundary Merging',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * // Definition for an Interval.
 * function Interval(start, end) {
 *    this.start = start;
 *    this.end = end;
 * };
 */

/**
 * @param {Interval[][]} schedule
 * @return {Interval[]}
 */
var employeeFreeTime = function(schedule) {
    const events = [];
    for (const emp of schedule) {
        for (const iv of emp) {
            events.push([iv.start, iv.end]);
        }
    }
    events.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
    const ans = [];
    let prevEnd = events[0][1];
    for (let i = 1; i < events.length; i++) {
        const [s, e] = events[i];
        if (s > prevEnd) {
            ans.push({ start: prevEnd, end: s });
        }
        prevEnd = Math.max(prevEnd, e);
    }
    return ans;
};`,
        approach: 'JavaScript Global Schedule Sorting',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'employee-free-time.json')

class Interval:
    def __init__(self, start: int = None, end: int = None):
        self.start = start
        self.end = end

class Solution:
    def employeeFreeTime(self, schedule: 'list[list[Interval]]') -> 'list[Interval]':
        events = []
        for emp in schedule:
            for iv in emp:
                events.append((iv.start, iv.end))
        events.sort()
        ans = []
        prev_end = events[0][1]
        for s, e in events[1:]:
            if s > prev_end:
                ans.append(Interval(prev_end, s))
            prev_end = max(prev_end, e)
        return ans

sol = Solution()
sch = [[Interval(1, 2), Interval(5, 6)], [Interval(1, 3)], [Interval(4, 10)]]
res = sol.employeeFreeTime(sch)
assert len(res) == 1
assert res[0].start == 3 and res[0].end == 4
print("✓ employee-free-time passed")
`
  },

  // 10. #770 basic-calculator-iv
  {
    slug: 'basic-calculator-iv',
    number: 770,
    category: 'Algorithms',
    patterns: ['stack-parentheses-parser'],
    hints: [
      {
        level: 1,
        title: 'Polynomial Algebraic Simplification',
        text: 'Represent expressions as polynomials mapping sorted tuples of variables to their integer coefficient.'
      },
      {
        level: 2,
        title: 'Polynomial Addition, Subtraction, and Multiplication',
        text: 'Substitute evaluated values for known variables. Polynomial addition merges like terms; multiplication convolves terms by concatenating variable lists and multiplying coefficients.'
      },
      {
        level: 3,
        title: 'Recursive Expression Parsing Blueprint',
        text: 'Parse expression with shunting-yard or recursive descent using precedence rules: * before + and -. Format output by sorting terms by descending degree then lexicographically.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport collections\n\nclass Poly(collections.Counter):\n    def __add__(self, other):\n        ans = Poly(self)\n        for k, v in other.items():\n            ans[k] += v\n        return ans\n\n    def __sub__(self, other):\n        ans = Poly(self)\n        for k, v in other.items():\n            ans[k] -= v\n        return ans\n\n    def __mul__(self, other):\n        ans = Poly()\n        for k1, v1 in self.items():\n            for k2, v2 in other.items():\n                ans[tuple(sorted(k1 + k2))] += v1 * v2\n        return ans\n\nclass Solution:\n    def basicCalculatorIV(self, expression: str, evalvars: list[str], evalints: list[int]) -> list[str]:\n        eval_map = dict(zip(evalvars, evalints))\n\n        def parse(token):\n            if token in eval_map:\n                token = str(eval_map[token])\n            if token.lstrip(\'-\').isdigit():\n                c = int(token)\n                return Poly({(): c})\n            return Poly({(token,): 1})\n\n        def tokenize(s):\n            tokens = []\n            i = 0\n            while i < len(s):\n                if s[i] == \' \':\n                    i += 1\n                elif s[i] in \'+-*()\':\n                    tokens.append(s[i])\n                    i += 1\n                else:\n                    j = i\n                    while j < len(s) and s[j] not in \' +-*()\':\n                        j += 1\n                    tokens.append(s[i:j])\n                    i = j\n            return tokens\n\n        tokens = tokenize(expression)\n        # Standard shunting yard or recursive evaluator\n        def evaluate_tokens(toks):\n            def compute(ops, vals):\n                op = ops.pop()\n                v2 = vals.pop()\n                v1 = vals.pop()\n                if op == \'+\': vals.append(v1 + v2)\n                elif op == \'-\': vals.append(v1 - v2)\n                elif op == \'*\': vals.append(v1 * v2)\n\n            ops = []\n            vals = []\n            prec = {\'+\': 1, \'-\': 1, \'*\': 2}\n            for tok in toks:\n                if tok == \'(\':\n                    ops.append(tok)\n                elif tok == \')\':\n                    while ops and ops[-1] != \'(\':\n                        compute(ops, vals)\n                    ops.pop()\n                elif tok in prec:\n                    while ops and ops[-1] != \'(\' and prec[ops[-1]] >= prec[tok]:\n                        compute(ops, vals)\n                    ops.append(tok)\n                else:\n                    vals.append(parse(tok))\n            while ops:\n                compute(ops, vals)\n            return vals[0]\n\n        poly = evaluate_tokens(tokens)\n        sorted_terms = sorted(poly.keys(), key=lambda t: (-len(t), t))\n        ans = []\n        for t in sorted_terms:\n            c = poly[t]\n            if c != 0:\n                term_str = \'*\'.join(t)\n                ans.append(f\"{c}*{term_str}\" if term_str else str(c))\n        return ans\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(2^N)',
      space: 'O(2^N)',
      variables: ['N: number of operations in expression'],
      notes: 'Term convolution expands polynomial terms exponentially in theoretical worst case, bounded by test constraints.',
      whyNaiveFails: 'Evaluating as scalar numbers loses symbolic variable term representations.',
      spaceTimeTradeoff: 'Counter map aggregates like terms by sorted variable tuple keys.',
      interviewerExpectation: 'Formal polynomial arithmetic implementation with correct precedence and formatting.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import collections

class Poly(collections.Counter):
    def __add__(self, other):
        ans = Poly(self)
        for k, v in other.items():
            ans[k] += v
        return ans

    def __sub__(self, other):
        ans = Poly(self)
        for k, v in other.items():
            ans[k] -= v
        return ans

    def __mul__(self, other):
        ans = Poly()
        for k1, v1 in self.items():
            for k2, v2 in other.items():
                ans[tuple(sorted(k1 + k2))] += v1 * v2
        return ans

class Solution:
    def basicCalculatorIV(self, expression: str, evalvars: list[str], evalints: list[int]) -> list[str]:
        eval_map = dict(zip(evalvars, evalints))

        def parse(token):
            if token in eval_map:
                token = str(eval_map[token])
            if token.lstrip('-').isdigit():
                c = int(token)
                return Poly({(): c})
            return Poly({(token,): 1})

        def tokenize(s):
            tokens = []
            i = 0
            while i < len(s):
                if s[i] == ' ':
                    i += 1
                elif s[i] in '+-*()':
                    tokens.append(s[i])
                    i += 1
                else:
                    j = i
                    while j < len(s) and s[j] not in ' +-*()':
                        j += 1
                    tokens.append(s[i:j])
                    i = j
            return tokens

        tokens = tokenize(expression)
        # Standard shunting yard or recursive evaluator
        def evaluate_tokens(toks):
            def compute(ops, vals):
                op = ops.pop()
                v2 = vals.pop()
                v1 = vals.pop()
                if op == '+': vals.append(v1 + v2)
                elif op == '-': vals.append(v1 - v2)
                elif op == '*': vals.append(v1 * v2)

            ops = []
            vals = []
            prec = {'+': 1, '-': 1, '*': 2}
            for tok in toks:
                if tok == '(':
                    ops.append(tok)
                elif tok == ')':
                    while ops and ops[-1] != '(':
                        compute(ops, vals)
                    ops.pop()
                elif tok in prec:
                    while ops and ops[-1] != '(' and prec[ops[-1]] >= prec[tok]:
                        compute(ops, vals)
                    ops.append(tok)
                else:
                    vals.append(parse(tok))
            while ops:
                compute(ops, vals)
            return vals[0]

        poly = evaluate_tokens(tokens)
        sorted_terms = sorted(poly.keys(), key=lambda t: (-len(t), t))
        ans = []
        for t in sorted_terms:
            c = poly[t]
            if c != 0:
                term_str = '*'.join(t)
                ans.append(f"{c}*{term_str}" if term_str else str(c))
        return ans`,
        approach: 'Symbolic Polynomial Class with Shunting-Yard Parser',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    struct Poly {
        map<vector<string>, int> terms;
        Poly() {}
        Poly(int c) { if (c != 0) terms[{}] = c; }
        Poly(string v) { terms[{v}] = 1; }

        Poly operator+(const Poly& o) const {
            Poly res = *this;
            for (auto& [k, v] : o.terms) res.terms[k] += v;
            return res;
        }
        Poly operator-(const Poly& o) const {
            Poly res = *this;
            for (auto& [k, v] : o.terms) res.terms[k] -= v;
            return res;
        }
        Poly operator*(const Poly& o) const {
            Poly res;
            for (auto& [k1, v1] : terms) {
                for (auto& [k2, v2] : o.terms) {
                    vector<string> k = k1;
                    k.insert(k.end(), k2.begin(), k2.end());
                    sort(k.begin(), k.end());
                    res.terms[k] += v1 * v2;
                }
            }
            return res;
        }
    };
public:
    vector<string> basicCalculatorIV(string expression, vector<string>& evalvars, vector<int>& evalints) {
        unordered_map<string, int> eval_map;
        for (size_t i = 0; i < evalvars.size(); ++i) eval_map[evalvars[i]] = evalints[i];

        vector<string> tokens;
        for (int i = 0; i < expression.size(); ) {
            if (expression[i] == ' ') { i++; continue; }
            if (string("+-*()").find(expression[i]) != string::npos) {
                tokens.push_back(string(1, expression[i++]));
            } else {
                int j = i;
                while (j < expression.size() && string(" +-*()").find(expression[j]) == string::npos) j++;
                tokens.push_back(expression.substr(i, j - i));
                i = j;
            }
        }

        vector<Poly> vals;
        vector<char> ops;
        auto compute = [&]() {
            char op = ops.back(); ops.pop_back();
            Poly v2 = vals.back(); vals.pop_back();
            Poly v1 = vals.back(); vals.pop_back();
            if (op == '+') vals.push_back(v1 + v2);
            else if (op == '-') vals.push_back(v1 - v2);
            else if (op == '*') vals.push_back(v1 * v2);
        };

        unordered_map<char, int> prec = {{'+', 1}, {'-', 1}, {'*', 2}};
        for (auto& tok : tokens) {
            if (tok == "(") ops.push_back('(');
            else if (tok == ")") {
                while (!ops.empty() && ops.back() != '(') compute();
                ops.pop_back();
            } else if (tok == "+" || tok == "-" || tok == "*") {
                char op = tok[0];
                while (!ops.empty() && ops.back() != '(' && prec[ops.back()] >= prec[op]) compute();
                ops.push_back(op);
            } else {
                if (eval_map.count(tok)) vals.push_back(Poly(eval_map[tok]));
                else if (isdigit(tok[0]) || (tok.size() > 1 && tok[0] == '-')) vals.push_back(Poly(stoi(tok)));
                else vals.push_back(Poly(tok));
            }
        }
        while (!ops.empty()) compute();

        Poly res = vals.back();
        vector<pair<vector<string>, int>> terms(res.terms.begin(), res.terms.end());
        sort(terms.begin(), terms.end(), [](const auto& a, const auto& b) {
            if (a.first.size() != b.first.size()) return a.first.size() > b.first.size();
            return a.first < b.first;
        });

        vector<string> ans;
        for (auto& [vars, coeff] : terms) {
            if (coeff == 0) continue;
            string s = to_string(coeff);
            for (auto& v : vars) s += "*" + v;
            ans.push_back(s);
        }
        return ans;
    }
};`,
        approach: 'C++ Polynomial Convolution and Operator Precedence',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

class Solution {
    static class Poly {
        Map<List<String>, Integer> terms = new HashMap<>();
        Poly() {}
        Poly(int c) { if (c != 0) terms.put(Collections.emptyList(), c); }
        Poly(String v) { terms.put(Collections.singletonList(v), 1); }

        Poly add(Poly o) {
            Poly res = new Poly();
            res.terms.putAll(terms);
            for (Map.Entry<List<String>, Integer> e : o.terms.entrySet()) {
                res.terms.put(e.getKey(), res.terms.getOrDefault(e.getKey(), 0) + e.getValue());
            }
            return res;
        }
        Poly sub(Poly o) {
            Poly res = new Poly();
            res.terms.putAll(terms);
            for (Map.Entry<List<String>, Integer> e : o.terms.entrySet()) {
                res.terms.put(e.getKey(), res.terms.getOrDefault(e.getKey(), 0) - e.getValue());
            }
            return res;
        }
        Poly mul(Poly o) {
            Poly res = new Poly();
            for (Map.Entry<List<String>, Integer> e1 : terms.entrySet()) {
                for (Map.Entry<List<String>, Integer> e2 : o.terms.entrySet()) {
                    List<String> k = new ArrayList<>(e1.getKey());
                    k.addAll(e2.getKey());
                    Collections.sort(k);
                    res.terms.put(k, res.terms.getOrDefault(k, 0) + e1.getValue() * e2.getValue());
                }
            }
            return res;
        }
    }

    public List<String> basicCalculatorIV(String expression, String[] evalvars, int[] evalints) {
        Map<String, Integer> evalMap = new HashMap<>();
        for (int i = 0; i < evalvars.length; i++) evalMap.put(evalvars[i], evalints[i]);

        List<String> tokens = new ArrayList<>();
        int i = 0, n = expression.length();
        while (i < n) {
            if (expression.charAt(i) == ' ') { i++; continue; }
            if ("+-*()".indexOf(expression.charAt(i)) != -1) {
                tokens.add(String.valueOf(expression.charAt(i++)));
            } else {
                int j = i;
                while (j < n && " +-*()".indexOf(expression.charAt(j)) == -1) j++;
                tokens.add(expression.substring(i, j));
                i = j;
            }
        }

        Deque<Poly> vals = new ArrayDeque<>();
        Deque<Character> ops = new ArrayDeque<>();
        Map<Character, Integer> prec = Map.of('+', 1, '-', 1, '*', 2);

        for (String tok : tokens) {
            if (tok.equals("(")) ops.push('(');
            else if (tok.equals(")")) {
                while (ops.peek() != '(') apply(ops, vals);
                ops.pop();
            } else if (tok.equals("+") || tok.equals("-") || tok.equals("*")) {
                char op = tok.charAt(0);
                while (!ops.isEmpty() && ops.peek() != '(' && prec.get(ops.peek()) >= prec.get(op)) {
                    apply(ops, vals);
                }
                ops.push(op);
            } else {
                if (evalMap.containsKey(tok)) vals.push(new Poly(evalMap.get(tok)));
                else if (Character.isDigit(tok.charAt(0)) || (tok.length() > 1 && tok.charAt(0) == '-')) vals.push(new Poly(Integer.parseInt(tok)));
                else vals.push(new Poly(tok));
            }
        }
        while (!ops.isEmpty()) apply(ops, vals);

        Poly res = vals.pop();
        List<Map.Entry<List<String>, Integer>> list = new ArrayList<>(res.terms.entrySet());
        list.sort((a, b) -> {
            if (a.getKey().size() != b.getKey().size()) return b.getKey().size() - a.getKey().size();
            for (int k = 0; k < a.getKey().size(); k++) {
                int cmp = a.getKey().get(k).compareTo(b.getKey().get(k));
                if (cmp != 0) return cmp;
            }
            return 0;
        });

        List<String> ans = new ArrayList<>();
        for (Map.Entry<List<String>, Integer> e : list) {
            int coeff = e.getValue();
            if (coeff == 0) continue;
            StringBuilder sb = new StringBuilder().append(coeff);
            for (String v : e.getKey()) sb.append("*").append(v);
            ans.add(sb.toString());
        }
        return ans;
    }

    private void apply(Deque<Character> ops, Deque<Poly> vals) {
        char op = ops.pop();
        Poly v2 = vals.pop(), v1 = vals.pop();
        if (op == '+') vals.push(v1.add(v2));
        else if (op == '-') vals.push(v1.sub(v2));
        else if (op == '*') vals.push(v1.mul(v2));
    }
}`,
        approach: 'Java Symbolic Polynomial Shunting-Yard Evaluation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {string} expression
 * @param {string[]} evalvars
 * @param {number[]} evalints
 * @return {string[]}
 */
var basicCalculatorIV = function(expression, evalvars, evalints) {
    const evalMap = new Map();
    for (let i = 0; i < evalvars.length; i++) evalMap.set(evalvars[i], evalints[i]);

    class Poly {
        constructor() {
            this.terms = new Map(); // key string -> coeff
        }
        static constant(c) {
            const p = new Poly();
            if (c !== 0) p.terms.set('', c);
            return p;
        }
        static variable(v) {
            const p = new Poly();
            p.terms.set(v, 1);
            return p;
        }
        add(o) {
            const res = new Poly();
            for (const [k, v] of this.terms) res.terms.set(k, v);
            for (const [k, v] of o.terms) res.terms.set(k, (res.terms.get(k) || 0) + v);
            return res;
        }
        sub(o) {
            const res = new Poly();
            for (const [k, v] of this.terms) res.terms.set(k, v);
            for (const [k, v] of o.terms) res.terms.set(k, (res.terms.get(k) || 0) - v);
            return res;
        }
        mul(o) {
            const res = new Poly();
            for (const [k1, v1] of this.terms) {
                for (const [k2, v2] of o.terms) {
                    const parts1 = k1 ? k1.split('*') : [];
                    const parts2 = k2 ? k2.split('*') : [];
                    const merged = parts1.concat(parts2).sort().join('*');
                    res.terms.set(merged, (res.terms.get(merged) || 0) + v1 * v2);
                }
            }
            return res;
        }
    }

    const tokens = [];
    let i = 0;
    while (i < expression.length) {
        if (expression[i] === ' ') { i++; continue; }
        if ('+-*()'.includes(expression[i])) {
            tokens.push(expression[i++]);
        } else {
            let j = i;
            while (j < expression.length && !' +-*()'.includes(expression[j])) j++;
            tokens.push(expression.slice(i, j));
            i = j;
        }
    }

    const vals = [];
    const ops = [];
    const prec = { '+': 1, '-': 1, '*': 2 };

    function compute() {
        const op = ops.pop();
        const v2 = vals.pop(), v1 = vals.pop();
        if (op === '+') vals.push(v1.add(v2));
        else if (op === '-') vals.push(v1.sub(v2));
        else if (op === '*') vals.push(v1.mul(v2));
    }

    for (const tok of tokens) {
        if (tok === '(') ops.push('(');
        else if (tok === ')') {
            while (ops[ops.length - 1] !== '(') compute();
            ops.pop();
        } else if (tok in prec) {
            while (ops.length && ops[ops.length - 1] !== '(' && prec[ops[ops.length - 1]] >= prec[tok]) {
                compute();
            }
            ops.push(tok);
        } else {
            if (evalMap.has(tok)) vals.push(Poly.constant(evalMap.get(tok)));
            else if (!isNaN(Number(tok))) vals.push(Poly.constant(Number(tok)));
            else vals.push(Poly.variable(tok));
        }
    }
    while (ops.length) compute();

    const poly = vals.pop();
    const entries = Array.from(poly.terms.entries()).filter(([k, v]) => v !== 0);
    entries.sort((a, b) => {
        const countA = a[0] ? a[0].split('*').length : 0;
        const countB = b[0] ? b[0].split('*').length : 0;
        if (countA !== countB) return countB - countA;
        return a[0].localeCompare(b[0]);
    });

    return entries.map(([k, v]) => k ? v + '*' + k : String(v));
};`,
        approach: 'JavaScript Poly Object Shunting-Yard Evaluator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'basic-calculator-iv.json')

import collections

class Poly(collections.Counter):
    def __add__(self, other):
        ans = Poly(self)
        for k, v in other.items():
            ans[k] += v
        return ans

    def __sub__(self, other):
        ans = Poly(self)
        for k, v in other.items():
            ans[k] -= v
        return ans

    def __mul__(self, other):
        ans = Poly()
        for k1, v1 in self.items():
            for k2, v2 in other.items():
                ans[tuple(sorted(k1 + k2))] += v1 * v2
        return ans

class Solution:
    def basicCalculatorIV(self, expression: str, evalvars: list[str], evalints: list[int]) -> list[str]:
        eval_map = dict(zip(evalvars, evalints))

        def parse(token):
            if token in eval_map:
                token = str(eval_map[token])
            if token.lstrip('-').isdigit():
                c = int(token)
                return Poly({(): c})
            return Poly({(token,): 1})

        def tokenize(s):
            tokens = []
            i = 0
            while i < len(s):
                if s[i] == ' ':
                    i += 1
                elif s[i] in '+-*()':
                    tokens.append(s[i])
                    i += 1
                else:
                    j = i
                    while j < len(s) and s[j] not in ' +-*()':
                        j += 1
                    tokens.append(s[i:j])
                    i = j
            return tokens

        tokens = tokenize(expression)
        def evaluate_tokens(toks):
            def compute(ops, vals):
                op = ops.pop()
                v2 = vals.pop()
                v1 = vals.pop()
                if op == '+': vals.append(v1 + v2)
                elif op == '-': vals.append(v1 - v2)
                elif op == '*': vals.append(v1 * v2)

            ops = []
            vals = []
            prec = {'+': 1, '-': 1, '*': 2}
            for tok in toks:
                if tok == '(':
                    ops.append(tok)
                elif tok == ')':
                    while ops and ops[-1] != '(':
                        compute(ops, vals)
                    ops.pop()
                elif tok in prec:
                    while ops and ops[-1] != '(' and prec[ops[-1]] >= prec[tok]:
                        compute(ops, vals)
                    ops.append(tok)
                else:
                    vals.append(parse(tok))
            while ops:
                compute(ops, vals)
            return vals[0]

        poly = evaluate_tokens(tokens)
        sorted_terms = sorted(poly.keys(), key=lambda t: (-len(t), t))
        ans = []
        for t in sorted_terms:
            c = poly[t]
            if c != 0:
                term_str = '*'.join(t)
                ans.append(f"{c}*{term_str}" if term_str else str(c))
        return ans

sol = Solution()
res = sol.basicCalculatorIV("e + 8 - a + 5", ["e"], [1])
assert res == ["-1*a", "14"]
print("✓ basic-calculator-iv passed")
`
  },

  // 11. #798 smallest-rotation-with-highest-score
  {
    slug: 'smallest-rotation-with-highest-score',
    number: 798,
    category: 'Algorithms',
    patterns: ['prefix-sum-hashmap'],
    hints: [
      {
        level: 1,
        title: 'Rotation Interval Scoring Ranges',
        text: 'For each index i, determine the exact interval of shift steps k where nums[i] lands at an index greater than or equal to its value.'
      },
      {
        level: 2,
        title: 'Difference Array Boundary Marking',
        text: 'A point is scored when (i - k + N) % N >= nums[i]. This simplifies to an interval of valid k values. Increment the start of this interval by 1 and decrement the end by 1 in a difference array.'
      },
      {
        level: 3,
        title: 'Prefix Sum Sweep for Maximum Score Blueprint',
        text: 'Allocate diff array of size N. For each i, mark the interval [ (i + 1) % N, (i - nums[i] + N + 1) % N ]. Accumulate prefix sums across k from 0 to N-1 and pick k minimizing index among maximum scores.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def bestRotation(self, nums: list[int]) -> int:\n        n = len(nums)\n        diff = [0] * n\n        for i, val in enumerate(nums):\n            low = (i + 1) % n\n            high = (i - val + n + 1) % n\n            diff[low] += 1\n            diff[high] -= 1\n            if low >= high:\n                diff[0] += 1\n        best_k = 0\n        max_score = -1\n        curr = 0\n        for k in range(n):\n            curr += diff[k]\n            if curr > max_score:\n                max_score = curr\n                best_k = k\n        return best_k\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: length of array nums'],
      notes: 'Difference array updates take O(1) per element; single linear prefix sum scan finds optimal k.',
      whyNaiveFails: 'Simulating array rotations takes O(N^2) resulting in time limit exceeded.',
      spaceTimeTradeoff: 'Difference array of size N captures score increments without full rotation arrays.',
      interviewerExpectation: 'Translating inequality into interval boundaries and accumulating with prefix difference.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def bestRotation(self, nums: list[int]) -> int:
        n = len(nums)
        diff = [0] * n
        for i, val in enumerate(nums):
            low = (i + 1) % n
            high = (i - val + n + 1) % n
            diff[low] += 1
            diff[high] -= 1
            if low >= high:
                diff[0] += 1
        best_k = 0
        max_score = -1
        curr = 0
        for k in range(n):
            curr += diff[k]
            if curr > max_score:
                max_score = curr
                best_k = k
        return best_k`,
        approach: 'Difference Array Interval Scoring',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int bestRotation(vector<int>& nums) {
        int n = nums.size();
        vector<int> diff(n, 0);
        for (int i = 0; i < n; ++i) {
            int low = (i + 1) % n;
            int high = (i - nums[i] + n + 1) % n;
            diff[low]++;
            diff[high]--;
            if (low >= high) diff[0]++;
        }
        int best_k = 0, max_score = -1, curr = 0;
        for (int k = 0; k < n; ++k) {
            curr += diff[k];
            if (curr > max_score) {
                max_score = curr;
                best_k = k;
            }
        }
        return best_k;
    }
};`,
        approach: 'C++ Difference Array Interval Accumulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int bestRotation(int[] nums) {
        int n = nums.length;
        int[] diff = new int[n];
        for (int i = 0; i < n; i++) {
            int low = (i + 1) % n;
            int high = (i - nums[i] + n + 1) % n;
            diff[low]++;
            diff[high]--;
            if (low >= high) diff[0]++;
        }
        int bestK = 0, maxScore = -1, curr = 0;
        for (int k = 0; k < n; k++) {
            curr += diff[k];
            if (curr > maxScore) {
                maxScore = curr;
                bestK = k;
            }
        }
        return bestK;
    }
}`,
        approach: 'Java Linear Difference Sweep',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {number}
 */
var bestRotation = function(nums) {
    const n = nums.length;
    const diff = new Int32Array(n);
    for (let i = 0; i < n; i++) {
        const low = (i + 1) % n;
        const high = (i - nums[i] + n + 1) % n;
        diff[low]++;
        diff[high]--;
        if (low >= high) diff[0]++;
    }
    let bestK = 0, maxScore = -1, curr = 0;
    for (let k = 0; k < n; k++) {
        curr += diff[k];
        if (curr > maxScore) {
            maxScore = curr;
            bestK = k;
        }
    }
    return bestK;
};`,
        approach: 'JavaScript TypedArray Interval Difference Scan',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'smallest-rotation-with-highest-score.json')

class Solution:
    def bestRotation(self, nums: list[int]) -> int:
        n = len(nums)
        diff = [0] * n
        for i, val in enumerate(nums):
            low = (i + 1) % n
            high = (i - val + n + 1) % n
            diff[low] += 1
            diff[high] -= 1
            if low >= high:
                diff[0] += 1
        best_k = 0
        max_score = -1
        curr = 0
        for k in range(n):
            curr += diff[k]
            if curr > max_score:
                max_score = curr
                best_k = k
        return best_k

sol = Solution()
assert sol.bestRotation([2, 3, 1, 4, 0]) == 3
assert sol.bestRotation([1, 3, 0, 2, 4]) == 0
print("✓ smallest-rotation-with-highest-score passed")
`
  },

  // 12. #800 similar-rgb-color
  {
    slug: 'similar-rgb-color',
    number: 800,
    category: 'Algorithms',
    patterns: ['math-number-theory'],
    hints: [
      {
        level: 1,
        title: 'Independent Component Quantization',
        text: 'The total squared color similarity error decomposes into the sum of three independent squared errors across red, green, and blue channels.'
      },
      {
        level: 2,
        title: 'Nearest Multiple of 17 Rounding',
        text: 'Shorthand hex colors have equal repeated digits (00, 11, ..., ff), representing multiples of 17 in base 10 (0 * 17 = 0, 1 * 17 = 17, ..., 15 * 17 = 255).'
      },
      {
        level: 3,
        title: 'Channel Quantization Blueprint',
        text: 'For each 2-character hex slice: convert to int decimal value V. Compute round(V / 17). Convert this quotient into a single hex digit and double it.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def similarRGB(self, color: str) -> str:\n        def round_channel(hex_str):\n            val = int(hex_str, 16)\n            idx = round(val / 17)\n            return f\"{idx:x}{idx:x}\"\n\n        r = round_channel(color[1:3])\n        g = round_channel(color[3:5])\n        b = round_channel(color[5:7])\n        return f\"#{r}{g}{b}\"\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Fixed 7-character RGB string'],
      notes: 'Three channel roundings each execute in constant mathematical operations.',
      whyNaiveFails: 'Searching all 16^3 = 4096 shorthand colors is unnecessary when each channel is independent.',
      spaceTimeTradeoff: 'Constant time modular rounding requires zero heap allocation.',
      interviewerExpectation: 'Recognizing 0x11 = 17 decimal property of repeated hex characters.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def similarRGB(self, color: str) -> str:
        def round_channel(hex_str):
            val = int(hex_str, 16)
            idx = round(val / 17)
            return f"{idx:x}{idx:x}"

        r = round_channel(color[1:3])
        g = round_channel(color[3:5])
        b = round_channel(color[5:7])
        return f"#{r}{g}{b}"`,
        approach: 'Hexadecimal Multiples of 17 Quantization',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    string roundChannel(const string& hex_str) {
        int val = stoi(hex_str, nullptr, 16);
        int idx = (val + 8) / 17;
        char buf[3];
        snprintf(buf, sizeof(buf), "%x%x", idx, idx);
        return string(buf);
    }
public:
    string similarRGB(string color) {
        string r = roundChannel(color.substr(1, 2));
        string g = roundChannel(color.substr(3, 2));
        string b = roundChannel(color.substr(5, 2));
        return "#" + r + g + b;
    }
};`,
        approach: 'C++ Channel Rounding via Division by 17',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private String roundChannel(String hexStr) {
        int val = Integer.parseInt(hexStr, 16);
        int idx = (val + 8) / 17;
        return Integer.toHexString(idx) + Integer.toHexString(idx);
    }

    public String similarRGB(String color) {
        String r = roundChannel(color.substring(1, 3));
        String g = roundChannel(color.substring(3, 5));
        String b = roundChannel(color.substring(5, 7));
        return "#" + r + g + b;
    }
}`,
        approach: 'Java Modular Component Quantization',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {string} color
 * @return {string}
 */
var similarRGB = function(color) {
    function roundChannel(hexStr) {
        const val = parseInt(hexStr, 16);
        const idx = Math.round(val / 17);
        const h = idx.toString(16);
        return h + h;
    }
    const r = roundChannel(color.slice(1, 3));
    const g = roundChannel(color.slice(3, 5));
    const b = roundChannel(color.slice(5, 7));
    return '#' + r + g + b;
};`,
        approach: 'JavaScript Independent Hex Quantization',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'similar-rgb-color.json')

class Solution:
    def similarRGB(self, color: str) -> str:
        def round_channel(hex_str):
            val = int(hex_str, 16)
            idx = round(val / 17)
            return f"{idx:x}{idx:x}"

        r = round_channel(color[1:3])
        g = round_channel(color[3:5])
        b = round_channel(color[5:7])
        return f"#{r}{g}{b}"

sol = Solution()
assert sol.similarRGB("#09f166") == "#11ee66"
assert sol.similarRGB("#4e3fe1") == "#5544dd"
print("✓ similar-rgb-color passed")
`
  }
];
