import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

export const BATCH4_PROBLEMS = [
  {
    slug: 'number-of-islands',
    number: 200,
    category: 'Algorithms',
    patterns: ['grid-flood-fill'],
    twist_type: 'In-Place Grid Cell Sinking',
    method: 'numIslands',
    hints: [
      {
        level: 1,
        title: 'Contiguous Land Traversal Obstacle',
        text: 'Counting contiguous land requires traversing every cell in an island without recounting previously visited parts. If you explore from a land cell, how can you ensure each connected land component is tallied only once?'
      },
      {
        level: 2,
        title: 'Component Sinking Invariant',
        text: 'Each unvisited land cell marks the discovery of a distinct island. Sinking or marking all reachable neighbors ensures each component is visited exactly once.'
      },
      {
        level: 3,
        title: 'Iterative Grid Traversal Procedure',
        text: 'Iterate through each cell of the grid. Whenever a cell contains land \'1\', increment the island count and initiate an expansion to all four adjacent neighbors, resetting visited land cells to \'0\'. Return the total count.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid:
            return 0
        m, n = len(grid), len(grid[0])
        count = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == '1':
                    count += 1
                    stack = [(r, c)]
                    grid[r][c] = '0'
                    while stack:
                        curr_r, curr_c = stack.pop()
                        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                            nr, nc = curr_r + dr, curr_c + dc
                            if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == '1':
                                grid[nr][nc] = '0'
                                stack.append((nr, nc))
        return count
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(M * N)',
      space: 'O(M * N)',
      variables: [
        'M: number of grid rows (1 <= M <= 300)',
        'N: number of grid columns (1 <= N <= 300)'
      ],
      notes: 'Every cell is visited a constant number of times. Auxiliary space is bounded by the frontier size or recursion depth.',
      whyNaiveFails: 'Re-evaluating or not tracking visited cells leads to infinite loops or recounting the same island multiple times.',
      spaceTimeTradeoff: 'Sinking land to \'0\' in-place avoids an external visited boolean matrix, running in O(M*N) time with O(M*N) worst-case frontier space.',
      interviewerExpectation: 'Four-directional boundary checks, sinking visited land cells in-place or using visited set, correct component counting.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid:
            return 0
        m, n = len(grid), len(grid[0])
        count = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == '1':
                    count += 1
                    stack = [(r, c)]
                    grid[r][c] = '0'
                    while stack:
                        curr_r, curr_c = stack.pop()
                        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                            nr, nc = curr_r + dr, curr_c + dc
                            if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == '1':
                                grid[nr][nc] = '0'
                                stack.append((nr, nc))
        return count`,
        approach: 'In-Place Grid Sinking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int m = grid.size(), n = grid[0].size();
        int count = 0;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == '1') {
                    count++;
                    vector<pair<int, int>> stack = {{r, c}};
                    grid[r][c] = '0';
                    while (!stack.empty()) {
                        auto [curr_r, curr_c] = stack.back();
                        stack.pop_back();
                        int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
                        for (auto& d : dirs) {
                            int nr = curr_r + d[0], nc = curr_c + d[1];
                            if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == '1') {
                                grid[nr][nc] = '0';
                                stack.push_back({nr, nc});
                            }
                        }
                    }
                }
            }
        }
        return count;
    }
};`,
        approach: 'Iterative Cell Sinking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int m = grid.length, n = grid[0].length;
        int count = 0;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == '1') {
                    count++;
                    sink(grid, r, c, m, n);
                }
            }
        }
        return count;
    }

    private void sink(char[][] grid, int r, int c, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;
        grid[r][c] = '0';
        sink(grid, r + 1, c, m, n);
        sink(grid, r - 1, c, m, n);
        sink(grid, r, c + 1, m, n);
        sink(grid, r, c - 1, m, n);
    }
}`,
        approach: 'Depth-First Cell Sinking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    if (!grid || grid.length === 0) return 0;
    const m = grid.length, n = grid[0].length;
    let count = 0;
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            if (grid[r][c] === '1') {
                count++;
                const stack = [[r, c]];
                grid[r][c] = '0';
                while (stack.length > 0) {
                    const [cr, cc] = stack.pop();
                    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
                    for (const [dr, dc] of dirs) {
                        const nr = cr + dr, nc = cc + dc;
                        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === '1') {
                            grid[nr][nc] = '0';
                            stack.push([nr, nc]);
                        }
                    }
                }
            }
        }
    }
    return count;
};`,
        approach: 'Iterative Grid Sinking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'clone-graph',
    number: 133,
    category: 'Algorithms',
    patterns: ['graph-bfs-shortest-path'],
    twist_type: 'Visited Cloned Node Registry',
    method: 'cloneGraph',
    hints: [
      {
        level: 1,
        title: 'Cyclic Node Duplication Obstacle',
        text: 'Graphs can contain cycles and multiple paths to the same vertex. When creating copies of vertices and edges, how can you prevent infinite recursion while preserving the original topology and vertex values?'
      },
      {
        level: 2,
        title: 'Original-to-Clone Map Invariant',
        text: 'A lookup registry mapping original vertices to their freshly allocated counterparts guarantees each vertex is cloned only once and shared edges are correctly reconstructed.'
      },
      {
        level: 3,
        title: 'Recursive Node Cloning Procedure',
        text: 'Return null if the input vertex is null. Check if the vertex already exists in a lookup table; if so, return its copy. Otherwise, create a new vertex copy and store it in the table. Recursively copy each neighbor and append it to the new vertex\'s neighbor collection.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        if not node:
            return None
        clones = {}
        def copy(curr):
            if curr in clones:
                return clones[curr]
            clone = Node(curr.val)
            clones[curr] = clone
            for neighbor in curr.neighbors:
                clone.neighbors.append(copy(neighbor))
            return clone
        return copy(node)
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(V + E)',
      space: 'O(V)',
      variables: [
        'V: number of vertices (0 <= V <= 100)',
        'E: number of edges'
      ],
      notes: 'Every vertex and edge is visited once. Space is consumed by the lookup registry and traversal call stack.',
      whyNaiveFails: 'Traversing without caching existing copies leads to infinite recursion on cycles and duplicated vertex copies.',
      spaceTimeTradeoff: 'A hash mapping from old node to new node ensures exactly V allocations and O(1) duplicate checks.',
      interviewerExpectation: 'Handling null graph, cycle prevention using a map, deep copying all neighbor connections rather than referencing originals.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:
        if not node:
            return None
        clones = {}
        def copy(curr):
            if curr in clones:
                return clones[curr]
            clone = Node(curr.val)
            clones[curr] = clone
            for neighbor in curr.neighbors:
                clone.neighbors.append(copy(neighbor))
            return clone
        return copy(node)`,
        approach: 'DFS with Cloned Node Registry',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
private:
    unordered_map<Node*, Node*> clones;
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        if (clones.find(node) != clones.end()) return clones[node];
        Node* clone = new Node(node->val);
        clones[node] = clone;
        for (Node* neighbor : node->neighbors) {
            clone->neighbors.push_back(cloneGraph(neighbor));
        }
        return clone;
    }
};`,
        approach: 'Recursive Map-Based Cloning',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    private Map<Node, Node> clones = new HashMap<>();

    public Node cloneGraph(Node node) {
        if (node == null) return null;
        if (clones.containsKey(node)) return clones.get(node);
        Node clone = new Node(node.val);
        clones.put(node, clone);
        for (Node neighbor : node.neighbors) {
            clone.neighbors.add(cloneGraph(neighbor));
        }
        return clone;
    }
}`,
        approach: 'Recursive HashMap Cloning',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function(node) {
    if (!node) return null;
    const clones = new Map();
    function copy(curr) {
        if (clones.has(curr)) return clones.get(curr);
        const clone = new Node(curr.val);
        clones.set(curr, clone);
        for (const neighbor of curr.neighbors) {
            clone.neighbors.push(copy(neighbor));
        }
        return clone;
    }
    return copy(node);
};`,
        approach: 'DFS Map-Based Graph Copy',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'rotting-oranges',
    number: 994,
    category: 'Algorithms',
    patterns: ['graph-multi-source-bfs'],
    twist_type: 'Multi-Source Wavefront Propagation',
    method: 'orangesRotting',
    hints: [
      {
        level: 1,
        title: 'Simultaneous Contamination Spread Obstacle',
        text: 'Multiple rotten oranges contaminate adjacent fresh ones simultaneously each minute. How can you model the parallel spread across all contamination fronts to determine the exact minimum time until no fresh oranges remain?'
      },
      {
        level: 2,
        title: 'Multi-Source Frontier Invariant',
        text: 'Tracking contamination level by level from all initial rotten sources simultaneously models the elapsed minutes until either all fresh items spoil or unreachable items remain.'
      },
      {
        level: 3,
        title: 'Frontier Level Processing Procedure',
        text: 'Count all fresh oranges and gather all initially rotten coordinates. If no fresh oranges exist, return 0. Process the frontier level by level; for each rotten position, convert unvisited fresh neighbors to rotten, decrement the fresh count, and add them to the next time step. Return elapsed minutes if fresh reaches 0, otherwise -1.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
from collections import deque

class Solution:
    def orangesRotting(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        q = deque()
        fresh = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 2:
                    q.append((r, c))
                elif grid[r][c] == 1:
                    fresh += 1
        if fresh == 0:
            return 0
        minutes = 0
        while q and fresh > 0:
            minutes += 1
            for _ in range(len(q)):
                r, c = q.popleft()
                for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                        grid[nr][nc] = 2
                        fresh -= 1
                        q.append((nr, nc))
        return minutes if fresh == 0 else -1
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(M * N)',
      space: 'O(M * N)',
      variables: [
        'M: grid rows (1 <= M <= 10)',
        'N: grid columns (1 <= N <= 10)'
      ],
      notes: 'Every cell is queued and processed at most once. Auxiliary space is bounded by the grid dimensions.',
      whyNaiveFails: 'Simulating minute-by-minute with full grid rescans takes O((M*N)^2) time and risks misidentifying newly rotten oranges as old ones in the same round.',
      spaceTimeTradeoff: 'A level-by-level frontier queue ensures linear O(M*N) time and strictly captures simultaneous expansion.',
      interviewerExpectation: 'Multi-source initialization, correctly counting minutes only when fresh oranges rot, edge case where fresh count starts at 0.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class Solution:
    def orangesRotting(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        q = deque()
        fresh = 0
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 2:
                    q.append((r, c))
                elif grid[r][c] == 1:
                    fresh += 1
        if fresh == 0:
            return 0
        minutes = 0
        while q and fresh > 0:
            minutes += 1
            for _ in range(len(q)):
                r, c = q.popleft()
                for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                        grid[nr][nc] = 2
                        fresh -= 1
                        q.append((nr, nc))
        return minutes if fresh == 0 else -1`,
        approach: 'Multi-Source Level-by-Level BFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int, int>> q;
        int fresh = 0;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == 2) q.push({r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }
        if (fresh == 0) return 0;
        int minutes = 0;
        int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        while (!q.empty() && fresh > 0) {
            minutes++;
            int sz = q.size();
            for (int i = 0; i < sz; ++i) {
                auto [r, c] = q.front();
                q.pop();
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.push({nr, nc});
                    }
                }
            }
        }
        return fresh == 0 ? minutes : -1;
    }
};`,
        approach: 'Queue-Based Multi-Source BFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int orangesRotting(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        Queue<int[]> q = new LinkedList<>();
        int fresh = 0;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == 2) q.offer(new int[]{r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }
        if (fresh == 0) return 0;
        int minutes = 0;
        int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        while (!q.isEmpty() && fresh > 0) {
            minutes++;
            int sz = q.size();
            for (int i = 0; i < sz; ++i) {
                int[] curr = q.poll();
                int r = curr[0], c = curr[1];
                for (int[] d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.offer(new int[]{nr, nc});
                    }
                }
            }
        }
        return fresh == 0 ? minutes : -1;
    }
}`,
        approach: 'Multi-Source Level BFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function(grid) {
    const m = grid.length, n = grid[0].length;
    const q = [];
    let fresh = 0;
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            if (grid[r][c] === 2) q.push([r, c]);
            else if (grid[r][c] === 1) fresh++;
        }
    }
    if (fresh === 0) return 0;
    let minutes = 0;
    let head = 0;
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    while (head < q.length && fresh > 0) {
        minutes++;
        const sz = q.length - head;
        for (let i = 0; i < sz; ++i) {
            const [r, c] = q[head++];
            for (const [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
                    grid[nr][nc] = 2;
                    fresh--;
                    q.push([nr, nc]);
                }
            }
        }
    }
    return fresh === 0 ? minutes : -1;
};`,
        approach: 'Array-Based Multi-Source BFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'pacific-atlantic-water-flow',
    number: 417,
    category: 'Algorithms',
    patterns: ['grid-flood-fill'],
    twist_type: 'Dual-Ocean Continental Coastal Reachability',
    method: 'pacificAtlantic',
    hints: [
      {
        level: 1,
        title: 'Downward Search Redundancy Obstacle',
        text: 'Checking whether water from each individual cell can flow down to both oceans causes repetitive upward searches. What happens if you invert the perspective and trace where water can flow uphill starting directly from the coastlines?'
      },
      {
        level: 2,
        title: 'Reverse Coastal Reachability Invariant',
        text: 'A cell can drain into an ocean if and only if that ocean\'s coastline can reach the cell via non-decreasing height steps. The intersection of both reachability zones yields all valid coordinates.'
      },
      {
        level: 3,
        title: 'Inverted Coastal Flood-Fill Procedure',
        text: 'Initialize two boolean grids for Pacific and Atlantic reachability. Initiate traversals moving inward from Pacific coastal edges to adjacent cells with equal or greater height, marking them reachable. Repeat independently from Atlantic edges. Collect all coordinates marked true in both grids.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:
        if not heights or not heights[0]:
            return []
        m, n = len(heights), len(heights[0])
        pac = set()
        atl = set()
        def dfs(r, c, visited):
            visited.add((r, c))
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and (nr, nc) not in visited and heights[nr][nc] >= heights[r][c]:
                    dfs(nr, nc, visited)
        for c in range(n):
            dfs(0, c, pac)
            dfs(m - 1, c, atl)
        for r in range(m):
            dfs(r, 0, pac)
            dfs(r, n - 1, atl)
        return [list(cell) for cell in (pac & atl)]
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(M * N)',
      space: 'O(M * N)',
      variables: [
        'M: grid rows (1 <= M <= 200)',
        'N: grid columns (1 <= N <= 200)'
      ],
      notes: 'Traversals from Pacific and Atlantic borders visit each cell at most once per ocean.',
      whyNaiveFails: 'Simulating downward flow from each of the M*N cells individually takes O((M*N)^2) time, leading to Time Limit Exceeded.',
      spaceTimeTradeoff: 'Running two inward coastal reachability passes and taking their intersection runs in O(M*N) time with O(M*N) visited storage.',
      interviewerExpectation: 'Reverse reachability insight (moving uphill from coasts), avoiding per-cell redundant searches, clean set or matrix intersection.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:
        if not heights or not heights[0]:
            return []
        m, n = len(heights), len(heights[0])
        pac = set()
        atl = set()
        def dfs(r, c, visited):
            visited.add((r, c))
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and (nr, nc) not in visited and heights[nr][nc] >= heights[r][c]:
                    dfs(nr, nc, visited)
        for c in range(n):
            dfs(0, c, pac)
            dfs(m - 1, c, atl)
        for r in range(m):
            dfs(r, 0, pac)
            dfs(r, n - 1, atl)
        return [list(cell) for cell in (pac & atl)]`,
        approach: 'Reverse Coastal DFS Intersection',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        if (heights.empty() || heights[0].empty()) return {};
        int m = heights.size(), n = heights[0].size();
        vector<vector<bool>> pac(m, vector<bool>(n, false));
        vector<vector<bool>> atl(m, vector<bool>(n, false));
        
        auto dfs = [&](auto self, int r, int c, vector<vector<bool>>& vis) -> void {
            vis[r][c] = true;
            int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !vis[nr][nc] && heights[nr][nc] >= heights[r][c]) {
                    self(self, nr, nc, vis);
                }
            }
        };

        for (int c = 0; c < n; ++c) {
            dfs(dfs, 0, c, pac);
            dfs(dfs, m - 1, c, atl);
        }
        for (int r = 0; r < m; ++r) {
            dfs(dfs, r, 0, pac);
            dfs(dfs, r, n - 1, atl);
        }

        vector<vector<int>> res;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (pac[r][c] && atl[r][c]) {
                    res.push_back({r, c});
                }
            }
        }
        return res;
    }
};`,
        approach: 'Dual Coastal Reachability Visited Grids',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        List<List<Integer>> res = new ArrayList<>();
        if (heights == null || heights.length == 0 || heights[0].length == 0) return res;
        int m = heights.length, n = heights[0].length;
        boolean[][] pac = new boolean[m][n];
        boolean[][] atl = new boolean[m][n];

        for (int c = 0; c < n; ++c) {
            dfs(heights, 0, c, pac);
            dfs(heights, m - 1, c, atl);
        }
        for (int r = 0; r < m; ++r) {
            dfs(heights, r, 0, pac);
            dfs(heights, r, n - 1, atl);
        }

        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (pac[r][c] && atl[r][c]) {
                    res.add(Arrays.asList(r, c));
                }
            }
        }
        return res;
    }

    private void dfs(int[][] h, int r, int c, boolean[][] vis) {
        vis[r][c] = true;
        int m = h.length, n = h[0].length;
        int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && !vis[nr][nc] && h[nr][nc] >= h[r][c]) {
                dfs(h, nr, nc, vis);
            }
        }
    }
}`,
        approach: 'Dual Visited Coastal Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
var pacificAtlantic = function(heights) {
    if (!heights || heights.length === 0 || heights[0].length === 0) return [];
    const m = heights.length, n = heights[0].length;
    const pac = Array.from({ length: m }, () => Array(n).fill(false));
    const atl = Array.from({ length: m }, () => Array(n).fill(false));

    function dfs(r, c, vis) {
        vis[r][c] = true;
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && !vis[nr][nc] && heights[nr][nc] >= heights[r][c]) {
                dfs(nr, nc, vis);
            }
        }
    }

    for (let c = 0; c < n; ++c) {
        dfs(0, c, pac);
        dfs(m - 1, c, atl);
    }
    for (let r = 0; r < m; ++r) {
        dfs(r, 0, pac);
        dfs(r, n - 1, atl);
    }

    const res = [];
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            if (pac[r][c] && atl[r][c]) res.push([r, c]);
        }
    }
    return res;
};`,
        approach: 'Dual Coastal Reachability Sets',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'course-schedule',
    number: 207,
    category: 'Algorithms',
    patterns: ['graph-topo-kahn'],
    twist_type: 'Directed Cycle Indegree Pruning',
    method: 'canFinish',
    hints: [
      {
        level: 1,
        title: 'Circular Dependency Pruning Obstacle',
        text: 'When courses require prerequisites, circular dependencies prevent completion. How can you systematically process courses that have zero remaining prerequisites to verify whether every course can eventually be taken?'
      },
      {
        level: 2,
        title: 'Topological Indegree Invariant',
        text: 'A valid schedule exists if and only if the dependency graph contains no directed cycles. Progressively removing nodes with zero prerequisites must resolve all nodes.'
      },
      {
        level: 3,
        title: 'Indegree Queue Processing Procedure',
        text: 'Build an adjacency list of course dependencies and compute each course\'s incoming prerequisite count. Collect all courses with zero incoming prerequisites. Repeatedly process each available course, decrementing the counts of its dependent courses and unlocking newly free courses. Return whether processed courses equals the total.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
from collections import deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        adj = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses
        for course, prereq in prerequisites:
            adj[prereq].append(course)
            indegree[course] += 1
        q = deque([i for i in range(numCourses) if indegree[i] == 0])
        taken = 0
        while q:
            curr = q.popleft()
            taken += 1
            for nxt in adj[curr]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    q.append(nxt)
        return taken == numCourses
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(V + E)',
      space: 'O(V + E)',
      variables: [
        'V: number of courses (1 <= V <= 2000)',
        'E: number of prerequisite pairs (0 <= E <= 5000)'
      ],
      notes: 'Every node and directed edge is processed once during queue-based topological sorting.',
      whyNaiveFails: 'Uncached cycle detection per node with brute-force exploration risks exponential paths on dense graphs.',
      spaceTimeTradeoff: 'Kahn\'s algorithm maintains indegrees with linear O(V + E) space, resolving courses in O(V + E) time.',
      interviewerExpectation: 'Graph construction, indegree calculation, zero-indegree queue traversal, checking total resolved count against V.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        adj = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses
        for course, prereq in prerequisites:
            adj[prereq].append(course)
            indegree[course] += 1
        q = deque([i for i in range(numCourses) if indegree[i] == 0])
        taken = 0
        while q:
            curr = q.popleft()
            taken += 1
            for nxt in adj[curr]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    q.append(nxt)
        return taken == numCourses`,
        approach: "Kahn's Topological Sort with Indegrees",
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indegree(numCourses, 0);
        for (auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            indegree[p[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; ++i) {
            if (indegree[i] == 0) q.push(i);
        }
        int taken = 0;
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            taken++;
            for (int nxt : adj[curr]) {
                if (--indegree[nxt] == 0) q.push(nxt);
            }
        }
        return taken == numCourses;
    }
};`,
        approach: "Kahn's BFS Indegree Reduction",
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; ++i) adj.add(new ArrayList<>());
        int[] indegree = new int[numCourses];
        for (int[] p : prerequisites) {
            adj.get(p[1]).add(p[0]);
            indegree[p[0]]++;
        }
        Queue<Integer> q = new LinkedList<>();
        for (int i = 0; i < numCourses; ++i) {
            if (indegree[i] == 0) q.offer(i);
        }
        int taken = 0;
        while (!q.isEmpty()) {
            int curr = q.poll();
            taken++;
            for (int nxt : adj.get(curr)) {
                if (--indegree[nxt] == 0) q.offer(nxt);
            }
        }
        return taken == numCourses;
    }
}`,
        approach: 'Topological Sort Indegree Queue',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    const adj = Array.from({ length: numCourses }, () => []);
    const indegree = new Int32Array(numCourses);
    for (const [course, prereq] of prerequisites) {
        adj[prereq].push(course);
        indegree[course]++;
    }
    const q = [];
    for (let i = 0; i < numCourses; ++i) {
        if (indegree[i] === 0) q.push(i);
    }
    let taken = 0;
    let head = 0;
    while (head < q.length) {
        const curr = q[head++];
        taken++;
        for (const nxt of adj[curr]) {
            if (--indegree[nxt] === 0) q.push(nxt);
        }
    }
    return taken === numCourses;
};`,
        approach: "Kahn's Algorithm with Array Queue",
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'redundant-connection',
    number: 684,
    category: 'Algorithms',
    patterns: ['graph-union-find-dsu'],
    twist_type: 'Disjoint Set Cycle Detection',
    method: 'findRedundantConnection',
    hints: [
      {
        level: 1,
        title: 'Spanning Tree Cycle Creation Obstacle',
        text: 'Adding an edge between vertices that are already connected in a spanning tree creates a cycle. How can you keep track of connected groups as you inspect edges one by one to pinpoint the first edge that connects an already connected component?'
      },
      {
        level: 2,
        title: 'Canonical Root Cycle Invariant',
        text: 'In a tree, adding an edge between two vertices with the same canonical representative creates a cycle. That edge is redundant.'
      },
      {
        level: 3,
        title: 'Disjoint Set Union Procedure',
        text: 'Initialize each vertex as its own parent. For each edge, find the canonical roots of both endpoints. If both roots are identical, the current edge forms a cycle and is the answer. Otherwise, union the two components by attaching one root to the other.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:
        parent = list(range(len(edges) + 1))
        def find(i):
            if parent[i] != i:
                parent[i] = find(parent[i])
            return parent[i]
        for u, v in edges:
            root_u = find(u)
            root_v = find(v)
            if root_u == root_v:
                return [u, v]
            parent[root_u] = root_v
        return []
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N * alpha(N))',
      space: 'O(N)',
      variables: [
        'N: number of vertices / edges (3 <= N <= 1000)',
        'alpha: inverse Ackermann function (effectively O(1))'
      ],
      notes: 'Path compression in Disjoint Set Union ensures near constant time per edge inspection.',
      whyNaiveFails: 'Rebuilding and searching the entire graph with DFS per edge takes O(N^2) time.',
      spaceTimeTradeoff: 'Union-find parent array provides O(N) space and nearly O(N) overall execution time.',
      interviewerExpectation: 'Path compression implementation, recognizing tree cycle property, returning the redundant edge in order of appearance.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:
        parent = list(range(len(edges) + 1))
        def find(i):
            if parent[i] != i:
                parent[i] = find(parent[i])
            return parent[i]
        for u, v in edges:
            root_u = find(u)
            root_v = find(v)
            if root_u == root_v:
                return [u, v]
            parent[root_u] = root_v
        return []`,
        approach: 'Union-Find with Path Compression',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> parent(n + 1);
        iota(parent.begin(), parent.end(), 0);

        auto find = [&](auto self, int i) -> int {
            if (parent[i] != i) parent[i] = self(self, parent[i]);
            return parent[i];
        };

        for (auto& edge : edges) {
            int root_u = find(find, edge[0]);
            int root_v = find(find, edge[1]);
            if (root_u == root_v) return edge;
            parent[root_u] = root_v;
        }
        return {};
    }
};`,
        approach: 'Disjoint Set Union Cycle Detection',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        int[] parent = new int[n + 1];
        for (int i = 0; i <= n; ++i) parent[i] = i;

        for (int[] edge : edges) {
            int root_u = find(parent, edge[0]);
            int root_v = find(parent, edge[1]);
            if (root_u == root_v) return edge;
            parent[root_u] = root_v;
        }
        return new int[0];
    }

    private int find(int[] parent, int i) {
        if (parent[i] != i) {
            parent[i] = find(parent, parent[i]);
        }
        return parent[i];
    }
}`,
        approach: 'DSU with Recursive Path Compression',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {
    const n = edges.length;
    const parent = Int32Array.from({ length: n + 1 }, (_, i) => i);

    function find(i) {
        if (parent[i] !== i) {
            parent[i] = find(parent[i]);
        }
        return parent[i];
    }

    for (const [u, v] of edges) {
        const root_u = find(u);
        const root_v = find(v);
        if (root_u === root_v) return [u, v];
        parent[root_u] = root_v;
    }
    return [];
};`,
        approach: 'TypedArray Disjoint Set Union',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'climbing-stairs',
    number: 70,
    category: 'Algorithms',
    patterns: ['dp-1d-fib-linear'],
    twist_type: 'Fibonacci Step Recurrence',
    method: 'climbStairs',
    hints: [
      {
        level: 1,
        title: 'Recursive Step Branching Obstacle',
        text: 'Each step can only be reached from one or two steps below. If you compute all distinct step sequences independently from scratch, duplicate subtrees cause exponential recomputation. How can the solution build directly from the previous two step counts?'
      },
      {
        level: 2,
        title: 'Two-Term Recurrence Invariant',
        text: 'The number of distinct ways to reach step n is the sum of ways to reach step n-1 and ways to reach step n-2, requiring only the two preceding counts.'
      },
      {
        level: 3,
        title: 'Constant-Space Iteration Procedure',
        text: 'Handle base cases: return 1 for 1 step and 2 for 2 steps. Initialize two variables representing the ways to reach the prior two steps. Loop from step 3 up to n, updating the total as their sum and shifting the two variables forward. Return the final accumulated count.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        prev2, prev1 = 1, 2
        for _ in range(3, n + 1):
            prev2, prev1 = prev1, prev2 + prev1
        return prev1
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: [
        'N: target step count (1 <= N <= 45)'
      ],
      notes: 'Iterates strictly N times updating two scalar variables.',
      whyNaiveFails: 'Uncached recursion branches twice at every step, yielding O(2^N) time and overflowing for N >= 40.',
      spaceTimeTradeoff: 'Tracking only the two most recent values achieves optimal O(1) space rather than maintaining an O(N) array.',
      interviewerExpectation: 'Recognizing equivalence to Fibonacci sequence, reduction from O(N) space to O(1) space.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        prev2, prev1 = 1, 2
        for _ in range(3, n + 1):
            prev2, prev1 = prev1, prev2 + prev1
        return prev1`,
        approach: 'Constant-Space Two-Variable Accumulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; ++i) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};`,
        approach: 'O(1) Space Iteration',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; ++i) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
}`,
        approach: 'Iterative Fibonacci Shift',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n <= 2) return n;
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; ++i) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
};`,
        approach: 'Constant-Space Rolling Accumulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'house-robber',
    number: 198,
    category: 'Algorithms',
    patterns: ['dp-1d-fib-linear'],
    twist_type: 'Adjacent Non-Consecutive Loot Optimization',
    method: 'rob',
    hints: [
      {
        level: 1,
        title: 'Adjacent Exclusion Branching Obstacle',
        text: 'Robbing two adjacent houses triggers an alarm. At each house, you must choose between robbing it and adding its loot to the best total from two houses back, or skipping it to keep the best total from the previous house. How can you track this choice without re-evaluating earlier houses?'
      },
      {
        level: 2,
        title: 'Non-Adjacent Optimal Substructure Invariant',
        text: 'The maximum loot up to house i is the greater of skipping house i or robbing house i plus the maximum loot up to house i-2.'
      },
      {
        level: 3,
        title: 'Two-State Rolling Maximization Procedure',
        text: 'Maintain two running values: the maximum loot achieved two houses back and one house back. For each house\'s value, compute the new maximum as the greater of the previous house\'s total or the two-back total plus current value. Shift the running values forward and return the final total.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def rob(self, nums: list[int]) -> int:
        rob1, rob2 = 0, 0
        for n in nums:
            new_rob = max(rob2, rob1 + n)
            rob1 = rob2
            rob2 = new_rob
        return rob2
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: [
        'N: number of houses (1 <= N <= 100)'
      ],
      notes: 'Single pass over nums updating two running values.',
      whyNaiveFails: 'Generating all valid non-consecutive subsets explores 2^N combinations, timing out on arrays with over 30 elements.',
      spaceTimeTradeoff: 'Maintaining rob1 and rob2 avoids allocating an O(N) array while retaining O(N) time.',
      interviewerExpectation: 'Formulating max(dp[i-1], dp[i-2] + nums[i]) and reducing space to two scalar variables.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def rob(self, nums: list[int]) -> int:
        rob1, rob2 = 0, 0
        for n in nums:
            new_rob = max(rob2, rob1 + n)
            rob1 = rob2
            rob2 = new_rob
        return rob2`,
        approach: 'Two-Variable Rolling Optimization',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int rob(vector<int>& nums) {
        int rob1 = 0, rob2 = 0;
        for (int n : nums) {
            int new_rob = max(rob2, rob1 + n);
            rob1 = rob2;
            rob2 = new_rob;
        }
        return rob2;
    }
};`,
        approach: 'O(1) Space State Transition',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int rob(int[] nums) {
        int rob1 = 0, rob2 = 0;
        for (int n : nums) {
            int newRob = Math.max(rob2, rob1 + n);
            rob1 = rob2;
            rob2 = newRob;
        }
        return rob2;
    }
}`,
        approach: 'Two-Variable DP Maximization',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    let rob1 = 0, rob2 = 0;
    for (const n of nums) {
        const newRob = Math.max(rob2, rob1 + n);
        rob1 = rob2;
        rob2 = newRob;
    }
    return rob2;
};`,
        approach: 'Scalar Rolling Variable Robbery',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'coin-change',
    number: 322,
    category: 'Algorithms',
    patterns: ['dp-knapsack-variants'],
    twist_type: 'Fewest Denominations Unbounded Knapsack',
    method: 'coinChange',
    hints: [
      {
        level: 1,
        title: 'Greedy Denomination Failure Obstacle',
        text: 'Greedy coin choices fail when larger denominations preclude optimal smaller combinations. How can you determine the fewest coins needed for an amount by building upon optimal answers for all smaller sub-amounts?'
      },
      {
        level: 2,
        title: 'Optimal Sub-Amount Invariant',
        text: 'The fewest coins to make amount a is one plus the minimum of fewest coins needed for amount a - c across all coin values c where a >= c.'
      },
      {
        level: 3,
        title: 'Bottom-Up Tabulation Procedure',
        text: 'Create an array of size amount + 1 filled with an infinity sentinel, setting index 0 to 0. For each target sub-amount from 1 to amount, iterate over every coin denomination. If the coin does not exceed the sub-amount, update the entry with the minimum of its current value or 1 + value at sub-amount minus coin. Return the entry for amount, or -1 if unreachable.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for a in range(1, amount + 1):
            for c in coins:
                if a - c >= 0:
                    dp[a] = min(dp[a], 1 + dp[a - c])
        return dp[amount] if dp[amount] != float('inf') else -1
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(amount * len(coins))',
      space: 'O(amount)',
      variables: [
        'amount: target integer (0 <= amount <= 10^4)',
        'len(coins): count of coin denominations (1 <= len(coins) <= 12)'
      ],
      notes: 'Evaluates each sub-amount from 1 to amount across all available coin values.',
      whyNaiveFails: 'Greedily picking largest coins fails for inputs like coins=[1, 3, 4, 5], amount=7 where greedy picks 5+1+1 (3 coins) instead of 4+3 (2 coins).',
      spaceTimeTradeoff: 'Tabulating 1D array of size amount + 1 takes O(amount) space and runs in O(amount * len(coins)) time.',
      interviewerExpectation: 'Understanding why greedy fails, base case initialization dp[0]=0, sentinel handling when amount is impossible.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        for a in range(1, amount + 1):
            for c in coins:
                if a - c >= 0:
                    dp[a] = min(dp[a], 1 + dp[a - c])
        return dp[amount] if dp[amount] != float('inf') else -1`,
        approach: 'Bottom-Up 1D DP Tabulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int a = 1; a <= amount; ++a) {
            for (int c : coins) {
                if (a - c >= 0) {
                    dp[a] = min(dp[a], 1 + dp[a - c]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
        approach: '1D DP Tabulation with Upper Bound Sentinel',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int a = 1; a <= amount; ++a) {
            for (int c : coins) {
                if (a - c >= 0) {
                    dp[a] = Math.min(dp[a], 1 + dp[a - c]);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
        approach: '1D Dynamic Programming Tabulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    const dp = new Int32Array(amount + 1).fill(amount + 1);
    dp[0] = 0;
    for (let a = 1; a <= amount; ++a) {
        for (const c of coins) {
            if (a - c >= 0) {
                const cand = 1 + dp[a - c];
                if (cand < dp[a]) dp[a] = cand;
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
};`,
        approach: 'Int32Array Unbounded Knapsack Tabulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'longest-increasing-subsequence',
    number: 300,
    category: 'Algorithms',
    patterns: ['dp-lis'],
    twist_type: 'Patience Sorting Tails Array',
    method: 'lengthOfLIS',
    hints: [
      {
        level: 1,
        title: 'Longest Subsequence Extension Obstacle',
        text: 'Finding the longest strictly increasing subsequence requires evaluating which earlier elements can extend a valid sequence. How can maintaining the smallest possible tail values for subsequences of each length allow deciding optimal placements in logarithmic time per element?'
      },
      {
        level: 2,
        title: 'Monotonic Tails Invariant',
        text: 'Storing the smallest ending value for each subsequence length creates a strictly increasing array of tails, where each new number either extends the longest length or lowers a tail value.'
      },
      {
        level: 3,
        title: 'Patience Sorting Binary Search Procedure',
        text: 'Initialize an empty list of tails. For each number in the array, locate its insertion point in tails via half-interval comparison. If the number is greater than all existing elements, append it. Otherwise, replace the element at the insertion point with the current number. Return the length of tails.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
import bisect

class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        tails = []
        for x in nums:
            idx = bisect.bisect_left(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x
        return len(tails)
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: [
        'N: length of array nums (1 <= N <= 2500)'
      ],
      notes: 'Binary searches the tails array for each of the N elements.',
      whyNaiveFails: 'Classic O(N^2) pairwise dynamic programming checks every previous element, which is too slow for large inputs.',
      spaceTimeTradeoff: 'Patience sorting maintains monotonic tails array in O(N) space and speeds up searches to O(N log N).',
      interviewerExpectation: 'Explaining patience sorting concept, bisect_left insertion invariant, recognizing final length equals tails array length.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import bisect

class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        tails = []
        for x in nums:
            idx = bisect.bisect_left(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x
        return len(tails)`,
        approach: 'Patience Sorting with Bisect',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;
        for (int x : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) {
                tails.push_back(x);
            } else {
                *it = x;
            }
        }
        return tails.size();
    }
};`,
        approach: 'std::lower_bound Monotonic Tails Array',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int size = 0;
        for (int x : nums) {
            int i = 0, j = size;
            while (i < j) {
                int m = (i + j) / 2;
                if (tails[m] < x) i = m + 1;
                else j = m;
            }
            tails[i] = x;
            if (i == size) size++;
        }
        return size;
    }
}`,
        approach: 'Binary Search Tails Array',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    const tails = [];
    for (const x of nums) {
        let low = 0, high = tails.length;
        while (low < high) {
            const mid = (low + high) >> 1;
            if (tails[mid] < x) low = mid + 1;
            else high = mid;
        }
        tails[low] = x;
    }
    return tails.length;
};`,
        approach: 'Binary Search Patience Sorting',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'word-break',
    number: 139,
    category: 'Algorithms',
    patterns: ['dp-1d-fib-linear'],
    twist_type: 'Prefix Segmentation Reachability',
    method: 'wordBreak',
    hints: [
      {
        level: 1,
        title: 'Overlapping Prefix Segmentation Obstacle',
        text: 'A prefix of the string might match multiple dictionary words of different lengths. If an early match leads to a dead end, backtracking naively takes exponential time. How can you mark which prefix lengths can be formed so later segments only build on validated prefixes?'
      },
      {
        level: 2,
        title: 'Prefix Decomposition Invariant',
        text: 'A string prefix of length i can be segmented if and only if there exists a valid segmented prefix of length j < i such that the substring between j and i is in the dictionary.'
      },
      {
        level: 3,
        title: 'Boolean Reachability Array Procedure',
        text: 'Create a boolean array of size n + 1 with index 0 set to true and all others false. Iterate each ending index i from 1 to n. For each starting index j from 0 to i, if index j is true and the substring from j to i exists in the dictionary set, mark index i as true and break early. Return the value at index n.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> bool:
        words = set(wordDict)
        n = len(s)
        dp = [False] * (n + 1)
        dp[0] = True
        for i in range(1, n + 1):
            for j in range(i):
                if dp[j] and s[j:i] in words:
                    dp[i] = True
                    break
        return dp[n]
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N^2 * L)',
      space: 'O(N + M * L)',
      variables: [
        'N: length of string s (1 <= N <= 300)',
        'M: number of words in dictionary',
        'L: maximum length of word in dictionary'
      ],
      notes: 'Substring slicing and set lookup takes O(L) time across O(N^2) index pairs.',
      whyNaiveFails: 'Brute-force recursive backtracking explores 2^N segmentations on inputs like s="aaaaab", words=["a", "aa", "aaa"].',
      spaceTimeTradeoff: 'A 1D boolean reachability array of size N + 1 avoids exponential recursion with minimal O(N) space.',
      interviewerExpectation: 'Using a hash set for O(1) dictionary lookups, correct base case dp[0]=True, 1-indexed DP alignment.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> bool:
        words = set(wordDict)
        n = len(s)
        dp = [False] * (n + 1)
        dp[0] = True
        for i in range(1, n + 1):
            for j in range(i):
                if dp[j] and s[j:i] in words:
                    dp[i] = True
                    break
        return dp[n]`,
        approach: '1D Boolean Reachability DP',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> words(wordDict.begin(), wordDict.end());
        int n = s.size();
        vector<bool> dp(n + 1, false);
        dp[0] = true;
        for (int i = 1; i <= n; ++i) {
            for (int j = 0; j < i; ++j) {
                if (dp[j] && words.find(s.substr(j, i - j)) != words.end()) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }
};`,
        approach: 'Prefix Reachability with Substr Lookups',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> words = new HashSet<>(wordDict);
        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;
        for (int i = 1; i <= n; ++i) {
            for (int j = 0; j < i; ++j) {
                if (dp[j] && words.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[n];
    }
}`,
        approach: 'Dynamic Programming Substring Partitioning',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    const words = new Set(wordDict);
    const n = s.length;
    const dp = new Uint8Array(n + 1);
    dp[0] = 1;
    for (let i = 1; i <= n; ++i) {
        for (let j = 0; j < i; ++j) {
            if (dp[j] && words.has(s.slice(j, i))) {
                dp[i] = 1;
                break;
            }
        }
    }
    return dp[n] === 1;
};`,
        approach: 'Uint8Array Reachability DP',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'partition-equal-subset-sum',
    number: 416,
    category: 'Algorithms',
    patterns: ['dp-knapsack-variants'],
    twist_type: 'Target Half-Sum Knapsack',
    method: 'canPartition',
    hints: [
      {
        level: 1,
        title: 'Subset Sum Partitioning Obstacle',
        text: 'Partitioning into two equal-sum subsets requires finding whether any subset sums to exactly half of the total sum. If the total sum is odd, no partition exists. How can you determine if target sum half exists without generating all exponential subsets?'
      },
      {
        level: 2,
        title: 'Half-Sum 0/1 Knapsack Invariant',
        text: 'The problem is equivalent to 0/1 knapsack where items are array numbers and target capacity is sum(nums) / 2.'
      },
      {
        level: 3,
        title: 'Reachable Sum Set Expansion Procedure',
        text: 'If the array sum is odd, return false immediately. Compute target = sum / 2. Initialize a set or boolean array with 0 as reachable. For each number, iterate through previously reachable sums and add the current number to each, inserting new reachable sums up to target. If target is reached, return true. If all numbers are processed without reaching target, return false.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        total = sum(nums)
        if total % 2 != 0:
            return False
        target = total // 2
        dp = {0}
        for n in nums:
            next_dp = set(dp)
            for t in dp:
                if t + n == target:
                    return True
                if t + n < target:
                    next_dp.add(t + n)
            dp = next_dp
        return target in dp
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N * target)',
      space: 'O(target)',
      variables: [
        'N: length of array nums (1 <= N <= 200)',
        'target: half sum of nums (sum(nums) / 2 <= 10000)'
      ],
      notes: 'Pseudo-polynomial time complexity based on target half-sum and array length.',
      whyNaiveFails: 'Generating all 2^N subsets times out on arrays with over 30 elements.',
      spaceTimeTradeoff: 'Compressing the knapsack table to a 1D boolean array of size target + 1 takes only O(target) space.',
      interviewerExpectation: 'Early exit for odd total sum, mapping to 0/1 knapsack with target = total / 2, reverse iteration to avoid reusing elements.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        total = sum(nums)
        if total % 2 != 0:
            return False
        target = total // 2
        dp = {0}
        for n in nums:
            next_dp = set(dp)
            for t in dp:
                if t + n == target:
                    return True
                if t + n < target:
                    next_dp.add(t + n)
            dp = next_dp
        return target in dp`,
        approach: 'Set-Based 0/1 Knapsack Reachability',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int total = accumulate(nums.begin(), nums.end(), 0);
        if (total % 2 != 0) return false;
        int target = total / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        for (int n : nums) {
            for (int t = target; t >= n; --t) {
                if (dp[t - n]) dp[t] = true;
            }
            if (dp[target]) return true;
        }
        return dp[target];
    }
};`,
        approach: '1D Reverse Iteration Boolean Knapsack',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public boolean canPartition(int[] nums) {
        int total = 0;
        for (int n : nums) total += n;
        if (total % 2 != 0) return false;
        int target = total / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int n : nums) {
            for (int t = target; t >= n; --t) {
                if (dp[t - n]) dp[t] = true;
            }
            if (dp[target]) return true;
        }
        return dp[target];
    }
}`,
        approach: '1D Boolean Subset Sum DP',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    let total = 0;
    for (const n of nums) total += n;
    if (total % 2 !== 0) return false;
    const target = total / 2;
    const dp = new Uint8Array(target + 1);
    dp[0] = 1;
    for (const n of nums) {
        for (let t = target; t >= n; --t) {
            if (dp[t - n]) dp[t] = 1;
        }
        if (dp[target]) return true;
    }
    return dp[target] === 1;
};`,
        approach: 'Uint8Array Reverse Knapsack DP',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'unique-paths',
    number: 62,
    category: 'Algorithms',
    patterns: ['dp-grid-2d'],
    twist_type: '2D Grid Inward Transition with 1D Rolling State',
    method: 'uniquePaths',
    hints: [
      {
        level: 1,
        title: 'Recursive Path Multiplication Obstacle',
        text: 'The robot can only move right or down at any step. Evaluating every branch recursively leads to redundant calculations of paths from identical cells. How can computing path counts starting from adjacent cells build the answer row by row?'
      },
      {
        level: 2,
        title: 'Sum of Inward Neighbors Invariant',
        text: 'The unique paths to reach cell (r, c) equals the paths to cell (r-1, c) plus the paths to cell (r, c-1), which can be stored in a single 1D row.'
      },
      {
        level: 3,
        title: 'Single-Row In-Place DP Procedure',
        text: 'Initialize a 1D row of size n filled with 1s, since there is only 1 path along any single row. For each remaining row from 1 to m-1, update each column index c from 1 to n-1 by adding the value from column c-1 to the existing value at column c. Return the final element of the row.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        row = [1] * n
        for _ in range(m - 1):
            for c in range(1, n):
                row[c] += row[c - 1]
        return row[-1]
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(M * N)',
      space: 'O(N)',
      variables: [
        'M: grid rows (1 <= M <= 100)',
        'N: grid columns (1 <= N <= 100)'
      ],
      notes: 'Compresses 2D grid DP into a single 1D array of length N.',
      whyNaiveFails: 'Uncached recursion branches into two subproblems at every cell, resulting in O(2^(M+N)) time complexity.',
      spaceTimeTradeoff: 'A single 1D array of size N reduces auxiliary space from O(M*N) to O(N) while preserving O(M*N) time.',
      interviewerExpectation: 'Formulating the recurrence dp[r][c] = dp[r-1][c] + dp[r][c-1] and optimizing space to a 1D rolling array.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        row = [1] * n
        for _ in range(m - 1):
            for c in range(1, n):
                row[c] += row[c - 1]
        return row[-1]`,
        approach: '1D Rolling Row Dynamic Programming',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> row(n, 1);
        for (int r = 1; r < m; ++r) {
            for (int c = 1; c < n; ++c) {
                row[c] += row[c - 1];
            }
        }
        return row[n - 1];
    }
};`,
        approach: 'Single Vector Rolling Accumulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int uniquePaths(int m, int n) {
        int[] row = new int[n];
        Arrays.fill(row, 1);
        for (int r = 1; r < m; ++r) {
            for (int c = 1; c < n; ++c) {
                row[c] += row[c - 1];
            }
        }
        return row[n - 1];
    }
}`,
        approach: '1D Array Space-Optimized DP',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    const row = new Int32Array(n).fill(1);
    for (let r = 1; r < m; ++r) {
        for (let c = 1; c < n; ++c) {
            row[c] += row[c - 1];
        }
    }
    return row[n - 1];
};`,
        approach: 'Int32Array Rolling Row DP',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'longest-common-subsequence',
    number: 1143,
    category: 'Algorithms',
    patterns: ['dp-longest-common-subseq'],
    twist_type: '2D Subsequence Character Alignment',
    method: 'longestCommonSubsequence',
    hints: [
      {
        level: 1,
        title: 'Scattered Match Alignment Obstacle',
        text: 'Two strings can match characters at scattered indices. When characters match, you want to extend the best prior match, and when they differ, you must choose the better subsequence excluding one character. How can you structure subproblem transitions without repeating evaluations?'
      },
      {
        level: 2,
        title: 'Character Match Diagonal Invariant',
        text: 'If characters match, the longest common subsequence extends the diagonal subproblem by one; otherwise, it is the maximum of excluding the character from either string.'
      },
      {
        level: 3,
        title: '2D Tabulation Alignment Procedure',
        text: 'Create a 2D table of size (m+1) x (n+1) initialized to 0. Iterate through each character of text1 with index i and text2 with index j. If characters match, set table[i][j] to 1 + table[i-1][j-1]. If they differ, set it to the maximum of table[i-1][j] and table[i][j-1]. Return table[m][n].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = 1 + dp[i - 1][j - 1]
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[m][n]
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(M * N)',
      space: 'O(M * N)',
      variables: [
        'M: length of text1 (1 <= M <= 1000)',
        'N: length of text2 (1 <= N <= 1000)'
      ],
      notes: 'Fills an (M+1) x (N+1) DP matrix with constant time transitions.',
      whyNaiveFails: 'Generating all 2^M subsequences of text1 to test in text2 requires exponential time, failing for strings longer than 25 characters.',
      spaceTimeTradeoff: '2D matrix tracks subproblem alignments in O(M*N) time and space (or O(min(M, N)) with rolling rows).',
      interviewerExpectation: 'Setting up (M+1) x (N+1) table with 0-indexed string offsets, identifying diagonal match vs adjacent max mismatch.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = 1 + dp[i - 1][j - 1]
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[m][n]`,
        approach: '2D Dynamic Programming Tabulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                if (text1[i - 1] == text2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
};`,
        approach: '2D Vector Tabulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`,
        approach: '2D Int Array LCS Alignment',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    const m = text1.length, n = text2.length;
    let prev = new Int32Array(n + 1);
    let curr = new Int32Array(n + 1);
    for (let i = 1; i <= m; ++i) {
        for (let j = 1; j <= n; ++j) {
            if (text1[i - 1] === text2[j - 1]) {
                curr[j] = 1 + prev[j - 1];
            } else {
                curr[j] = curr[j - 1] > prev[j] ? curr[j - 1] : prev[j];
            }
        }
        prev.set(curr);
    }
    return prev[n];
};`,
        approach: 'Two-Row Rolling TypedArray LCS',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'jump-game',
    number: 55,
    category: 'Algorithms',
    patterns: ['greedy-general'],
    twist_type: 'Farthest Reachable Index Invariant',
    method: 'canJump',
    hints: [
      {
        level: 1,
        title: 'Combinatorial Jump Branching Obstacle',
        text: 'Each array index specifies the maximum jump length forward. Testing every combination of jump lengths explores exponential possibilities. How can maintaining a single running bound of the farthest reachable index determine whether the final index is attainable?'
      },
      {
        level: 2,
        title: 'Max-Reach Invariant',
        text: 'If the current index exceeds the maximum reach achievable so far, progress is halted. Otherwise, the maximum reach extends to max(current reach, i + nums[i]).'
      },
      {
        level: 3,
        title: 'Single-Pass Greedy Scan Procedure',
        text: 'Initialize max_reach to 0. Iterate through each index i and value n. If i exceeds max_reach, return false immediately. Update max_reach as the maximum of max_reach and i + n. If max_reach is greater than or equal to the last index, return true. Return true after completing the loop.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def canJump(self, nums: list[int]) -> bool:
        max_reach = 0
        for i, n in enumerate(nums):
            if i > max_reach:
                return False
            max_reach = max(max_reach, i + n)
            if max_reach >= len(nums) - 1:
                return True
        return True
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: [
        'N: length of array nums (1 <= N <= 10^4)'
      ],
      notes: 'Single forward pass updating a single reachability integer.',
      whyNaiveFails: 'Recursively testing all possible jump lengths takes O(2^N) time, timing out on arrays with multiple zero or large jumps.',
      spaceTimeTradeoff: 'Greedy max-reach tracking delivers optimal O(N) time and O(1) space with no auxiliary arrays.',
      interviewerExpectation: 'Early exit when current index exceeds max reach, early return when max reach reaches last index.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def canJump(self, nums: list[int]) -> bool:
        max_reach = 0
        for i, n in enumerate(nums):
            if i > max_reach:
                return False
            max_reach = max(max_reach, i + n)
            if max_reach >= len(nums) - 1:
                return True
        return True`,
        approach: 'Single-Pass Greedy Farthest Reach',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    bool canJump(vector<int>& nums) {
        int max_reach = 0;
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            if (i > max_reach) return false;
            max_reach = max(max_reach, i + nums[i]);
            if (max_reach >= n - 1) return true;
        }
        return true;
    }
};`,
        approach: 'Greedy Boundary Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public boolean canJump(int[] nums) {
        int maxReach = 0;
        int n = nums.length;
        for (int i = 0; i < n; ++i) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= n - 1) return true;
        }
        return true;
    }
}`,
        approach: 'Greedy Frontier Linear Scan',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    let maxReach = 0;
    const n = nums.length;
    for (let i = 0; i < n; ++i) {
        if (i > maxReach) return false;
        const reach = i + nums[i];
        if (reach > maxReach) maxReach = reach;
        if (maxReach >= n - 1) return true;
    }
    return true;
};`,
        approach: 'Constant-Space Greedy Max Reach',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'merge-intervals',
    number: 56,
    category: 'Algorithms',
    patterns: ['greedy-interval-scheduling'],
    twist_type: 'Sorted Boundary Overlap Merging',
    method: 'merge',
    hints: [
      {
        level: 1,
        title: 'Unsorted Interval Overlap Obstacle',
        text: 'Intervals can arrive unsorted with arbitrary overlaps. Comparing all pairs to check for overlap takes quadratic time. How can sorting intervals by their start points ensure that overlapping intervals are always adjacent in the sequence?'
      },
      {
        level: 2,
        title: 'Adjacent Boundary Overlap Invariant',
        text: 'When intervals are sorted by start time, a subsequent interval overlaps with the prior merged interval if and only if its start time is less than or equal to the prior interval\'s end time.'
      },
      {
        level: 3,
        title: 'Sort and Linear Merge Procedure',
        text: 'Return the intervals if empty. Sort intervals in ascending order by their start times. Initialize a result list with the first interval. For each subsequent interval, check if its start time is less than or equal to the last merged interval\'s end time; if so, update the end time to the maximum of both. Otherwise, append the interval as a new disjoint entry.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        if not intervals:
            return []
        intervals.sort(key=lambda x: x[0])
        merged = [intervals[0]]
        for curr in intervals[1:]:
            prev = merged[-1]
            if curr[0] <= prev[1]:
                prev[1] = max(prev[1], curr[1])
            else:
                merged.append(curr)
        return merged
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N log N)',
      space: 'O(N)',
      variables: [
        'N: number of intervals (1 <= N <= 10^4)'
      ],
      notes: 'Sorting takes O(N log N) time; merging takes a single O(N) linear pass.',
      whyNaiveFails: 'Comparing and merging all pairs iteratively takes O(N^2) time and requires complex repeatedly updated graph components.',
      spaceTimeTradeoff: 'Sorting by start coordinates guarantees adjacent overlaps, taking O(N) space for sorted output.',
      interviewerExpectation: 'Correct interval sorting key, in-place expansion of merged interval end time, handling nested and touching intervals.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        if not intervals:
            return []
        intervals.sort(key=lambda x: x[0])
        merged = [intervals[0]]
        for curr in intervals[1:]:
            prev = merged[-1]
            if curr[0] <= prev[1]:
                prev[1] = max(prev[1], curr[1])
            else:
                merged.append(curr)
        return merged`,
        approach: 'Sort and Linear Merging Pass',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged;
        merged.push_back(intervals[0]);
        for (size_t i = 1; i < intervals.size(); ++i) {
            auto& prev = merged.back();
            if (intervals[i][0] <= prev[1]) {
                prev[1] = max(prev[1], intervals[i][1]);
            } else {
                merged.push_back(intervals[i]);
            }
        }
        return merged;
    }
};`,
        approach: 'Sorting with In-Place Interval Extension',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> merged = new ArrayList<>();
        merged.add(intervals[0]);
        for (int i = 1; i < intervals.length; ++i) {
            int[] prev = merged.get(merged.size() - 1);
            if (intervals[i][0] <= prev[1]) {
                prev[1] = Math.max(prev[1], intervals[i][1]);
            } else {
                merged.add(intervals[i]);
            }
        }
        return merged.toArray(new int[merged.size()][]);
    }
}`,
        approach: 'Comparator Sorting with Linear Merge',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (!intervals || intervals.length <= 1) return intervals || [];
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    for (let i = 1; i < intervals.length; ++i) {
        const prev = merged[merged.length - 1];
        if (intervals[i][0] <= prev[1]) {
            prev[1] = Math.max(prev[1], intervals[i][1]);
        } else {
            merged.push(intervals[i]);
        }
    }
    return merged;
};`,
        approach: 'In-Place Array Sort and Merge',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'non-overlapping-intervals',
    number: 435,
    category: 'Algorithms',
    patterns: ['greedy-interval-scheduling'],
    twist_type: 'Earliest End-Time Elimination Strategy',
    method: 'eraseOverlapIntervals',
    hints: [
      {
        level: 1,
        title: 'Conflict Resolution Choice Obstacle',
        text: 'When intervals conflict, removing one interval resolves the overlap. Which interval should be removed to leave the maximum remaining room for future non-overlapping intervals?'
      },
      {
        level: 2,
        title: 'Earliest Finish Time Invariant',
        text: 'Sorting intervals by end time ensures that greedily keeping the interval that finishes earliest minimizes conflicts with all subsequent intervals.'
      },
      {
        level: 3,
        title: 'End-Time Sorting Greedy Scan Procedure',
        text: 'If intervals is empty, return 0. Sort intervals by their end times. Maintain the end time of the last accepted interval and a removal counter. For each interval, if its start time is strictly less than the last accepted end time, increment the removal counter. Otherwise, update the accepted end time to the current interval\'s end. Return the removal counter.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:
        if not intervals:
            return 0
        intervals.sort(key=lambda x: x[1])
        count = 0
        prev_end = intervals[0][1]
        for i in range(1, len(intervals)):
            if intervals[i][0] < prev_end:
                count += 1
            else:
                prev_end = intervals[i][1]
        return count
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N log N)',
      space: 'O(1)',
      variables: [
        'N: number of intervals (1 <= N <= 10^5)'
      ],
      notes: 'Sorting intervals by end time takes O(N log N); linear greedy scan takes O(N).',
      whyNaiveFails: 'Testing all subsets of intervals to find the largest mutually compatible subset takes exponential O(2^N) time.',
      spaceTimeTradeoff: 'Interval scheduling theorem proves greedily picking the earliest finish time yields the optimal answer in O(1) extra space.',
      interviewerExpectation: 'Sorting by end time rather than start time, recognizing strict inequality requirement for overlap (touching endpoints do not overlap).'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def eraseOverlapIntervals(self, intervals: list[list[int]]) -> int:
        if not intervals:
            return 0
        intervals.sort(key=lambda x: x[1])
        count = 0
        prev_end = intervals[0][1]
        for i in range(1, len(intervals)):
            if intervals[i][0] < prev_end:
                count += 1
            else:
                prev_end = intervals[i][1]
        return count`,
        approach: 'Greedy Interval Scheduling by End Time',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end(), [](const auto& a, const auto& b) {
            return a[1] < b[1];
        });
        int count = 0;
        int prev_end = intervals[0][1];
        for (size_t i = 1; i < intervals.size(); ++i) {
            if (intervals[i][0] < prev_end) {
                count++;
            } else {
                prev_end = intervals[i][1];
            }
        }
        return count;
    }
};`,
        approach: 'End-Time Comparator Sorting',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length <= 1) return 0;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        int count = 0;
        int prevEnd = intervals[0][1];
        for (int i = 1; i < intervals.length; ++i) {
            if (intervals[i][0] < prevEnd) {
                count++;
            } else {
                prevEnd = intervals[i][1];
            }
        }
        return count;
    }
}`,
        approach: 'Greedy Finish Time Removal Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    if (!intervals || intervals.length <= 1) return 0;
    intervals.sort((a, b) => a[1] - b[1]);
    let count = 0;
    let prevEnd = intervals[0][1];
    for (let i = 1; i < intervals.length; ++i) {
        if (intervals[i][0] < prevEnd) {
            count++;
        } else {
            prevEnd = intervals[i][1];
        }
    }
    return count;
};`,
        approach: 'Linear Greedy End-Time Tracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },

  {
    slug: 'counting-bits',
    number: 338,
    category: 'Algorithms',
    patterns: ['bit-manipulation-tricks'],
    twist_type: 'Least Significant Bit Offset Recurrence',
    method: 'countBits',
    hints: [
      {
        level: 1,
        title: 'Per-Number Bit Iteration Obstacle',
        text: 'Counting set bits for each integer from 0 to n independently by inspecting every bit position takes O(n log n) time. How can the bit count of any number relate directly to the bit count of a smaller number with one fewer bit?'
      },
      {
        level: 2,
        title: 'Right-Shift Subproblem Invariant',
        text: 'Right-shifting a number by one removes its least significant bit, meaning countBits(i) = countBits(i >> 1) + (i & 1).'
      },
      {
        level: 3,
        title: 'Linear DP Bit Shift Procedure',
        text: 'Allocate an array ans of size n + 1 initialized to zeros. Loop index i from 1 to n. For each i, compute ans[i] as ans[i >> 1] plus (i & 1). Return the populated array ans.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def countBits(self, n: int) -> list[int]:
        ans = [0] * (n + 1)
        for i in range(1, n + 1):
            ans[i] = ans[i >> 1] + (i & 1)
        return ans
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: [
        'N: upper integer bound (0 <= N <= 10^5)'
      ],
      notes: 'Computes set bits for all numbers in a single linear pass using bit shifts.',
      whyNaiveFails: 'Calling bit_count / hamming weight on each number takes O(N * 32) bit operations rather than reusing subproblem results in O(1) operations per number.',
      spaceTimeTradeoff: 'Reusing ans[i >> 1] provides O(N) linear time with O(1) auxiliary space beyond the output array.',
      interviewerExpectation: 'Explaining recurrence relation ans[i] = ans[i >> 1] + (i & 1), bitwise right shift efficiency.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def countBits(self, n: int) -> list[int]:
        ans = [0] * (n + 1)
        for i in range(1, n + 1):
            ans[i] = ans[i >> 1] + (i & 1)
        return ans`,
        approach: 'Bitwise Right Shift Recurrence',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> ans(n + 1, 0);
        for (int i = 1; i <= n; ++i) {
            ans[i] = ans[i >> 1] + (i & 1);
        }
        return ans;
    }
};`,
        approach: 'Linear Bit Shift Recurrence',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1];
        for (int i = 1; i <= n; ++i) {
            ans[i] = ans[i >> 1] + (i & 1);
        }
        return ans;
    }
}`,
        approach: '1D Bitwise Shift Tabulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
    const ans = new Int32Array(n + 1);
    for (let i = 1; i <= n; ++i) {
        ans[i] = ans[i >> 1] + (i & 1);
    }
    return Array.from(ans);
};`,
        approach: 'TypedArray Bit Shift Iteration',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  }
];

export function writeBatch4() {
  const problemsDir = path.join(rootDir, 'dataset', 'problems');
  const testsDir = path.join(rootDir, 'dataset', 'tests');

  for (const prob of BATCH4_PROBLEMS) {
    const probFile = path.join(problemsDir, `${prob.slug}.json`);
    const problemData = {
      slug: prob.slug,
      number: prob.number,
      category: prob.category,
      patterns: prob.patterns,
      hints: prob.hints,
      complexity: prob.complexity,
      solutions: prob.solutions,
      review: {
        status: 'tested',
        acceptedOnLeetCode: null,
        reviewer: null
      },
      updated: '2026-10-18T00:00:00.000Z'
    };

    fs.writeFileSync(probFile, JSON.stringify(problemData, null, 2) + '\n', 'utf8');
    console.log(`✓ Wrote dataset/problems/${prob.slug}.json`);

    // Ensure tests directory exists
    const testDir = path.join(testsDir, prob.slug);
    fs.mkdirSync(testDir, { recursive: true });

    // Write meta.json
    const meta = {
      slug: prob.slug,
      entrypoint: 'test.py',
      comparator: (prob.slug === 'pacific-atlantic-water-flow' || prob.slug === 'merge-intervals') ? 'property' : 'exact',
      method: prob.method,
      reference: `Independent algorithmic reference test for ${prob.slug}`
    };
    fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n', 'utf8');
  }

  console.log(`✓ Successfully populated ${BATCH4_PROBLEMS.length} problem files and meta.json test configs`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeBatch4();
}
