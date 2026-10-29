import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Problem definitions for Batch 18 Algorithms (16 problems: #1263 - #1420)
export const batch18Algo = [
  // 1. #1263 minimum-moves-to-move-a-box-to-their-target-location
  {
    slug: 'minimum-moves-to-move-a-box-to-their-target-location',
    number: 1263,
    category: 'Algorithms',
    patterns: ['graph-bfs-shortest-path'],
    hints: [
      {
        level: 1,
        title: 'Composite Box and Player Positioning',
        text: 'The state space consists of the current box coordinates paired with the current player coordinates on the grid.'
      },
      {
        level: 2,
        title: 'Player Reachability Pre-check',
        text: 'For the player to push the box in direction D, the player must be able to reach the cell opposite to direction D without passing through the box.'
      },
      {
        level: 3,
        title: 'Nested Breadth Search Formulation',
        text: 'Use 0-1 BFS or Dijkstra on state (box_r, box_c, player_r, player_c) where box moves cost 1 push and player repositioning costs 0.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import deque\n\nclass Solution:\n    def minPushBox(self, grid: list[list[str]]) -> int:\n        R, C = len(grid), len(grid[0])\n        for r in range(R):\n            for c in range(C):\n                if grid[r][c] == "B":\n                    box = (r, c)\n                elif grid[r][c] == "S":\n                    player = (r, c)\n                elif grid[r][c] == "T":\n                    target = (r, c)\n\n        def can_reach(start, dest, b_pos):\n            if start == dest: return True\n            q = deque([start])\n            seen = {start, b_pos}\n            while q:\n                cr, cc = q.popleft()\n                if (cr, cc) == dest: return True\n                for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                    nr, nc = cr + dr, cc + dc\n                    if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] != "#" and (nr, nc) not in seen:\n                        seen.add((nr, nc))\n                        q.append((nr, nc))\n            return False\n\n        q = deque([(0, box[0], box[1], player[0], player[1])])\n        visited = {(box[0], box[1], player[0], player[1])}\n\n        while q:\n            pushes, br, bc, pr, pc = q.popleft()\n            if (br, bc) == target:\n                return pushes\n\n            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:\n                nbr, nbc = br + dr, bc + dc\n                push_from_r, push_from_c = br - dr, bc - dc\n                if 0 <= nbr < R and 0 <= nbc < C and grid[nbr][nbc] != "#":\n                    if 0 <= push_from_r < R and 0 <= push_from_c < C and grid[push_from_r][push_from_c] != "#":\n                        if can_reach((pr, pc), (push_from_r, push_from_c), (br, bc)):\n                            nxt_state = (nbr, nbc, br, bc)\n                            if nxt_state not in visited:\n                                visited.add(nxt_state)\n                                q.append((pushes + 1, nbr, nbc, br, bc))\n        return -1\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O((R * C)^2)',
      space: 'O((R * C)^2)',
      variables: ['R: grid rows', 'C: grid columns'],
      notes: 'Total states is bounded by (R * C) box positions times 4 adjacent player positions, each verified with BFS in O(R * C) time.',
      whyNaiveFails: 'Simple shortest path ignores the physical constraint that player must navigate around obstacles and the box to execute pushes.',
      spaceTimeTradeoff: 'Memoizing reachable player components prevents redundant flood-fill sub-searches.',
      interviewerExpectation: 'Nested breadth-first search separating push transitions from player transit reachability.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class Solution:
    def minPushBox(self, grid: list[list[str]]) -> int:
        R, C = len(grid), len(grid[0])
        for r in range(R):
            for c in range(C):
                if grid[r][c] == "B":
                    box = (r, c)
                elif grid[r][c] == "S":
                    player = (r, c)
                elif grid[r][c] == "T":
                    target = (r, c)

        def can_reach(start, dest, b_pos):
            if start == dest: return True
            q = deque([start])
            seen = {start, b_pos}
            while q:
                cr, cc = q.popleft()
                if (cr, cc) == dest: return True
                for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                    nr, nc = cr + dr, cc + dc
                    if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] != "#" and (nr, nc) not in seen:
                        seen.add((nr, nc))
                        q.append((nr, nc))
            return False

        q = deque([(0, box[0], box[1], player[0], player[1])])
        visited = {(box[0], box[1], player[0], player[1])}

        while q:
            pushes, br, bc, pr, pc = q.popleft()
            if (br, bc) == target:
                return pushes

            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                nbr, nbc = br + dr, bc + dc
                push_from_r, push_from_c = br - dr, bc - dc
                if 0 <= nbr < R and 0 <= nbc < C and grid[nbr][nbc] != "#":
                    if 0 <= push_from_r < R and 0 <= push_from_c < C and grid[push_from_r][push_from_c] != "#":
                        if can_reach((pr, pc), (push_from_r, push_from_c), (br, bc)):
                            nxt_state = (nbr, nbc, br, bc)
                            if nxt_state not in visited:
                                visited.add(nxt_state)
                                q.append((pushes + 1, nbr, nbc, br, bc))
        return -1`,
        approach: 'Dual State BFS with Reachability Check',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int minPushBox(vector<vector<char>>& grid) {
        int R = grid.size(), C = grid[0].size();
        pair<int,int> box, player, target;
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                if (grid[r][c] == 'B') box = {r, c};
                else if (grid[r][c] == 'S') player = {r, c};
                else if (grid[r][c] == 'T') target = {r, c};
            }
        }
        auto canReach = [&](pair<int,int> s, pair<int,int> d, pair<int,int> b) {
            if (s == d) return true;
            queue<pair<int,int>> q;
            vector<vector<bool>> vis(R, vector<bool>(C, false));
            q.push(s);
            vis[s.first][s.second] = true;
            vis[b.first][b.second] = true;
            int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
            while (!q.empty()) {
                auto [r, c] = q.front(); q.pop();
                if (r == d.first && c == d.second) return true;
                for (auto& dir : dirs) {
                    int nr = r + dir[0], nc = c + dir[1];
                    if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] != '#' && !vis[nr][nc]) {
                        vis[nr][nc] = true;
                        q.push({nr, nc});
                    }
                }
            }
            return false;
        };
        queue<vector<int>> q;
        vector<vector<vector<vector<bool>>>> visited(R, vector<vector<vector<bool>>>(C, vector<vector<bool>>(R, vector<bool>(C, false))));
        q.push({0, box.first, box.second, player.first, player.second});
        visited[box.first][box.second][player.first][player.second] = true;
        int dirs[4][2] = {{-1,0},{1,0},{0,-1},{0,1}};
        while (!q.empty()) {
            auto curr = q.front(); q.pop();
            int d = curr[0], br = curr[1], bc = curr[2], pr = curr[3], pc = curr[4];
            if (br == target.first && bc == target.second) return d;
            for (auto& dir : dirs) {
                int nbr = br + dir[0], nbc = bc + dir[1];
                int pfr = br - dir[0], pfc = bc - dir[1];
                if (nbr >= 0 && nbr < R && nbc >= 0 && nbc < C && grid[nbr][nbc] != '#') {
                    if (pfr >= 0 && pfr < R && pfc >= 0 && pfc < C && grid[pfr][pfc] != '#') {
                        if (canReach({pr, pc}, {pfr, pfc}, {br, bc})) {
                            if (!visited[nbr][nbc][br][bc]) {
                                visited[nbr][nbc][br][bc] = true;
                                q.push({d + 1, nbr, nbc, br, bc});
                            }
                        }
                    }
                }
            }
        }
        return -1;
    }
};`,
        approach: 'C++ 4D State Breadth Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int minPushBox(char[][] grid) {
        int R = grid.length, C = grid[0].length;
        int[] box = new int[2], player = new int[2], target = new int[2];
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                if (grid[r][c] == 'B') { box[0] = r; box[1] = c; }
                else if (grid[r][c] == 'S') { player[0] = r; player[1] = c; }
                else if (grid[r][c] == 'T') { target[0] = r; target[1] = c; }
            }
        }
        Queue<int[]> q = new LinkedList<>();
        boolean[][][][] vis = new boolean[R][C][R][C];
        q.offer(new int[]{0, box[0], box[1], player[0], player[1]});
        vis[box[0]][box[1]][player[0]][player[1]] = true;
        int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
        while (!q.isEmpty()) {
            int[] curr = q.poll();
            int d = curr[0], br = curr[1], bc = curr[2], pr = curr[3], pc = curr[4];
            if (br == target[0] && bc == target[1]) return d;
            for (int[] dir : dirs) {
                int nbr = br + dir[0], nbc = bc + dir[1];
                int pfr = br - dir[0], pfc = bc - dir[1];
                if (nbr >= 0 && nbr < R && nbc >= 0 && nbc < C && grid[nbr][nbc] != '#') {
                    if (pfr >= 0 && pfr < R && pfc >= 0 && pfc < C && grid[pfr][pfc] != '#') {
                        if (canReach(grid, R, C, pr, pc, pfr, pfc, br, bc)) {
                            if (!vis[nbr][nbc][br][bc]) {
                                vis[nbr][nbc][br][bc] = true;
                                q.offer(new int[]{d + 1, nbr, nbc, br, bc});
                            }
                        }
                    }
                }
            }
        }
        return -1;
    }
    private boolean canReach(char[][] grid, int R, int C, int sr, int sc, int dr, int dc, int br, int bc) {
        if (sr == dr && sc == dc) return true;
        Queue<int[]> q = new LinkedList<>();
        boolean[][] vis = new boolean[R][C];
        q.offer(new int[]{sr, sc});
        vis[sr][sc] = true;
        vis[br][bc] = true;
        int[][] dirs = {{-1,0},{1,0},{0,-1},{0,1}};
        while (!q.isEmpty()) {
            int[] curr = q.poll();
            if (curr[0] == dr && curr[1] == dc) return true;
            for (int[] dir : dirs) {
                int nr = curr[0] + dir[0], nc = curr[1] + dir[1];
                if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] != '#' && !vis[nr][nc]) {
                    vis[nr][nc] = true;
                    q.offer(new int[]{nr, nc});
                }
            }
        }
        return false;
    }
}`,
        approach: 'Java Breadth Search with Reachability Subroutine',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var minPushBox = function(grid) {
    const R = grid.length, C = grid[0].length;
    let box, player, target;
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            if (grid[r][c] === 'B') box = [r, c];
            else if (grid[r][c] === 'S') player = [r, c];
            else if (grid[r][c] === 'T') target = [r, c];
        }
    }
    function canReach(sr, sc, dr, dc, br, bc) {
        if (sr === dr && sc === dc) return true;
        const q = [[sr, sc]];
        const vis = Array.from({ length: R }, () => Array(C).fill(false));
        vis[sr][sc] = true;
        vis[br][bc] = true;
        const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
        while (q.length > 0) {
            const [r, c] = q.shift();
            if (r === dr && c === dc) return true;
            for (const [drr, dcc] of dirs) {
                const nr = r + drr, nc = c + dcc;
                if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] !== '#' && !vis[nr][nc]) {
                    vis[nr][nc] = true;
                    q.push([nr, nc]);
                }
            }
        }
        return false;
    }
    const q = [[0, box[0], box[1], player[0], player[1]]];
    const visited = new Set([\`\${box[0]},\${box[1]},\${player[0]},\${player[1]}\`]);
    const dirs = [[-1,0],[1,0],[0,-1],[0,1]];
    while (q.length > 0) {
        const [d, br, bc, pr, pc] = q.shift();
        if (br === target[0] && bc === target[1]) return d;
        for (const [dr, dc] of dirs) {
            const nbr = br + dr, nbc = bc + dc;
            const pfr = br - dr, pfc = bc - dc;
            if (nbr >= 0 && nbr < R && nbc >= 0 && nbc < C && grid[nbr][nbc] !== '#') {
                if (pfr >= 0 && pfr < R && pfc >= 0 && pfc < C && grid[pfr][pfc] !== '#') {
                    if (canReach(pr, pc, pfr, pfc, br, bc)) {
                        const key = \`\${nbr},\${nbc},\${br},\${bc}\`;
                        if (!visited.has(key)) {
                            visited.add(key);
                            q.push([d + 1, nbr, nbc, br, bc]);
                        }
                    }
                }
            }
        }
    }
    return -1;
};`,
        approach: 'JavaScript Push BFS and Player Reachability',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `from collections import deque

class Solution:
    def minPushBox(self, grid: list[list[str]]) -> int:
        R, C = len(grid), len(grid[0])
        for r in range(R):
            for c in range(C):
                if grid[r][c] == "B":
                    box = (r, c)
                elif grid[r][c] == "S":
                    player = (r, c)
                elif grid[r][c] == "T":
                    target = (r, c)

        def can_reach(start, dest, b_pos):
            if start == dest: return True
            q = deque([start])
            seen = {start, b_pos}
            while q:
                cr, cc = q.popleft()
                if (cr, cc) == dest: return True
                for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                    nr, nc = cr + dr, cc + dc
                    if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] != "#" and (nr, nc) not in seen:
                        seen.add((nr, nc))
                        q.append((nr, nc))
            return False

        q = deque([(0, box[0], box[1], player[0], player[1])])
        visited = {(box[0], box[1], player[0], player[1])}

        while q:
            pushes, br, bc, pr, pc = q.popleft()
            if (br, bc) == target:
                return pushes

            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                nbr, nbc = br + dr, bc + dc
                push_from_r, push_from_c = br - dr, bc - dc
                if 0 <= nbr < R and 0 <= nbc < C and grid[nbr][nbc] != "#":
                    if 0 <= push_from_r < R and 0 <= push_from_c < C and grid[push_from_r][push_from_c] != "#":
                        if can_reach((pr, pc), (push_from_r, push_from_c), (br, bc)):
                            nxt_state = (nbr, nbc, br, bc)
                            if nxt_state not in visited:
                                visited.add(nxt_state)
                                q.append((pushes + 1, nbr, nbc, br, bc))
        return -1

sol = Solution()
g1 = [["#","#","#","#","#","#"],
      ["#","T","#","#","#","#"],
      ["#",".",".","B",".","#"],
      ["#",".","#","#",".","#"],
      ["#",".",".",".","S","#"],
      ["#","#","#","#","#","#"]]
assert sol.minPushBox(g1) == 3
print("All tests passed successfully.")
`
  },

  // 2. #1265 print-immutable-linked-list-in-reverse
  {
    slug: 'print-immutable-linked-list-in-reverse',
    number: 1265,
    category: 'Algorithms',
    patterns: ['linked-list-pointers'],
    hints: [
      {
        level: 1,
        title: 'Recursive Traversal Unwinding',
        text: 'The immutable interface forbids modifying pointers, but natural call recursion unwinds elements from tail to head.'
      },
      {
        level: 2,
        title: 'Post-Order Output Timing',
        text: 'Traverse recursively to the next node before invoking printValue on the current node.'
      },
      {
        level: 3,
        title: 'Block Partitioning for Constant Memory',
        text: 'For sublinear space, count nodes and divide into sqrt(N) blocks, printing each block in reverse.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def printLinkedListInReverse(self, head: \'ImmutableListNode\') -> None:\n        if not head:\n            return\n        self.printLinkedListInReverse(head.getNext())\n        head.printValue()\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of nodes in the linked list'],
      notes: 'Recursion stack holds N frames during the post-order unwinding phase.',
      whyNaiveFails: 'Immutable interface prevents mutating next pointers to reverse the list in-place.',
      spaceTimeTradeoff: 'Pure recursive post-order trades O(N) recursion memory for simple O(N) linear time.',
      interviewerExpectation: 'Post-order recursion or sqrt-decomposition for O(sqrt(N)) space.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def printLinkedListInReverse(self, head: 'ImmutableListNode') -> None:
        if not head:
            return
        self.printLinkedListInReverse(head.getNext())
        head.printValue()`,
        approach: 'Post-Order Recursion Unwinding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    void printLinkedListInReverse(ImmutableListNode* head) {
        if (!head) return;
        printLinkedListInReverse(head->getNext());
        head->printValue();
    }
};`,
        approach: 'C++ Post-Order Recursion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public void printLinkedListInReverse(ImmutableListNode head) {
        if (head == null) return;
        printLinkedListInReverse(head.getNext());
        head.printValue();
    }
}`,
        approach: 'Java Call Stack Reversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var printLinkedListInReverse = function(head) {
    if (!head) return;
    printLinkedListInReverse(head.getNext());
    head.printValue();
};`,
        approach: 'JavaScript Recursive Post-Order',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class MockNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next
    def printValue(self):
        output.append(self.val)
    def getNext(self):
        return self.next

class Solution:
    def printLinkedListInReverse(self, head: 'MockNode') -> None:
        if not head:
            return
        self.printLinkedListInReverse(head.getNext())
        head.printValue()

output = []
n3 = MockNode(3)
n2 = MockNode(2, n3)
n1 = MockNode(1, n2)
sol = Solution()
sol.printLinkedListInReverse(n1)
assert output == [3, 2, 1]
print("All tests passed successfully.")
`
  },

  // 3. #1274 number-of-ships-in-a-rectangle
  {
    slug: 'number-of-ships-in-a-rectangle',
    number: 1274,
    category: 'Algorithms',
    patterns: ['binary-search-basic'],
    hints: [
      {
        level: 1,
        title: 'Quadtree Spatial Bisection',
        text: 'If hasShips returns false for a region, zero ships exist inside it. Otherwise, divide into four smaller quadrants.'
      },
      {
        level: 2,
        title: 'Four Quadrant Partitioning',
        text: 'Bisect the rectangular domain along midX and midY to produce bottom-left, bottom-right, top-left, and top-right sub-regions.'
      },
      {
        level: 3,
        title: 'Base Case Point Convergence',
        text: 'When topRight equals bottomLeft, a true query indicates exactly one ship located at that discrete point.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def countShips(self, sea: \'Sea\', topRight: \'Point\', bottomLeft: \'Point\') -> int:\n        if topRight.x < bottomLeft.x or topRight.y < bottomLeft.y:\n            return 0\n        if not sea.hasShips(topRight, bottomLeft):\n            return 0\n        if topRight.x == bottomLeft.x and topRight.y == bottomLeft.y:\n            return 1\n        mid_x = (topRight.x + bottomLeft.x) // 2\n        mid_y = (topRight.y + bottomLeft.y) // 2\n        return (\n            self.countShips(sea, Point(mid_x, mid_y), bottomLeft) +\n            self.countShips(sea, Point(topRight.x, mid_y), Point(mid_x + 1, bottomLeft.y)) +\n            self.countShips(sea, Point(mid_x, topRight.y), Point(bottomLeft.x, mid_y + 1)) +\n            self.countShips(sea, topRight, Point(mid_x + 1, mid_y + 1))\n        )\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(S * log(max(X, Y)))',
      space: 'O(log(max(X, Y)))',
      variables: ['S: number of ships (at most 10)', 'X, Y: dimensions of the grid (1000)'],
      notes: 'Quadtree descent only branches along quadrants harboring ships, capped well below 400 API queries.',
      whyNaiveFails: 'Querying all 1000 x 1000 grid points exhausts the 400 API query limit instantly.',
      spaceTimeTradeoff: 'Pruning empty quadrants recursively achieves exponential query reduction.',
      interviewerExpectation: '2D divide-and-conquer quadtree partitioning with boundary edge-case handling.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def countShips(self, sea: 'Sea', topRight: 'Point', bottomLeft: 'Point') -> int:
        if topRight.x < bottomLeft.x or topRight.y < bottomLeft.y:
            return 0
        if not sea.hasShips(topRight, bottomLeft):
            return 0
        if topRight.x == bottomLeft.x and topRight.y == bottomLeft.y:
            return 1
        mid_x = (topRight.x + bottomLeft.x) // 2
        mid_y = (topRight.y + bottomLeft.y) // 2
        return (
            self.countShips(sea, Point(mid_x, mid_y), bottomLeft) +
            self.countShips(sea, Point(topRight.x, mid_y), Point(mid_x + 1, bottomLeft.y)) +
            self.countShips(sea, Point(mid_x, topRight.y), Point(bottomLeft.x, mid_y + 1)) +
            self.countShips(sea, topRight, Point(mid_x + 1, mid_y + 1))
        )`,
        approach: '2D Quadtree Spatial Divide and Conquer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int countShips(Sea sea, vector<int> topRight, vector<int> bottomLeft) {
        if (topRight[0] < bottomLeft[0] || topRight[1] < bottomLeft[1]) return 0;
        if (!sea.hasShips(topRight, bottomLeft)) return 0;
        if (topRight[0] == bottomLeft[0] && topRight[1] == bottomLeft[1]) return 1;
        int midX = (topRight[0] + bottomLeft[0]) / 2;
        int midY = (topRight[1] + bottomLeft[1]) / 2;
        return countShips(sea, {midX, midY}, bottomLeft) +
               countShips(sea, {topRight[0], midY}, {midX + 1, bottomLeft[1]}) +
               countShips(sea, {midX, topRight[1]}, {bottomLeft[0], midY + 1}) +
               countShips(sea, topRight, {midX + 1, midY + 1});
    }
};`,
        approach: 'C++ Quadtree Spatial Recursion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int countShips(Sea sea, int[] topRight, int[] bottomLeft) {
        if (topRight[0] < bottomLeft[0] || topRight[1] < bottomLeft[1]) return 0;
        if (!sea.hasShips(topRight, bottomLeft)) return 0;
        if (topRight[0] == bottomLeft[0] && topRight[1] == bottomLeft[1]) return 1;
        int midX = (topRight[0] + bottomLeft[0]) / 2;
        int midY = (topRight[1] + bottomLeft[1]) / 2;
        return countShips(sea, new int[]{midX, midY}, bottomLeft) +
               countShips(sea, new int[]{topRight[0], midY}, new int[]{midX + 1, bottomLeft[1]}) +
               countShips(sea, new int[]{midX, topRight[1]}, new int[]{bottomLeft[0], midY + 1}) +
               countShips(sea, topRight, new int[]{midX + 1, midY + 1});
    }
}`,
        approach: 'Java 2D Bisection Quadtree',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var countShips = function(sea, topRight, bottomLeft) {
    if (topRight[0] < bottomLeft[0] || topRight[1] < bottomLeft[1]) return 0;
    if (!sea.hasShips(topRight, bottomLeft)) return 0;
    if (topRight[0] === bottomLeft[0] && topRight[1] === bottomLeft[1]) return 1;
    const midX = Math.floor((topRight[0] + bottomLeft[0]) / 2);
    const midY = Math.floor((topRight[1] + bottomLeft[1]) / 2);
    return countShips(sea, [midX, midY], bottomLeft) +
           countShips(sea, [topRight[0], midY], [midX + 1, bottomLeft[1]]) +
           countShips(sea, [midX, topRight[1]], [bottomLeft[0], midY + 1]) +
           countShips(sea, topRight, [midX + 1, midY + 1]);
};`,
        approach: 'JavaScript Spatial Quadtree Recursion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class Sea:
    def __init__(self, ships):
        self.ships = set(ships)
    def hasShips(self, topRight: Point, bottomLeft: Point) -> bool:
        for x, y in self.ships:
            if bottomLeft.x <= x <= topRight.x and bottomLeft.y <= y <= topRight.y:
                return True
        return False

class Solution:
    def countShips(self, sea: Sea, topRight: Point, bottomLeft: Point) -> int:
        if topRight.x < bottomLeft.x or topRight.y < bottomLeft.y:
            return 0
        if not sea.hasShips(topRight, bottomLeft):
            return 0
        if topRight.x == bottomLeft.x and topRight.y == bottomLeft.y:
            return 1
        mid_x = (topRight.x + bottomLeft.x) // 2
        mid_y = (topRight.y + bottomLeft.y) // 2
        return (
            self.countShips(sea, Point(mid_x, mid_y), bottomLeft) +
            self.countShips(sea, Point(topRight.x, mid_y), Point(mid_x + 1, bottomLeft.y)) +
            self.countShips(sea, Point(mid_x, topRight.y), Point(bottomLeft.x, mid_y + 1)) +
            self.countShips(sea, topRight, Point(mid_x + 1, mid_y + 1))
        )

sol = Solution()
sea = Sea([(1, 1), (2, 2), (3, 3)])
res = sol.countShips(sea, Point(4, 4), Point(0, 0))
assert res == 3
print("All tests passed successfully.")
`
  },

  // 4. #1286 iterator-for-combination
  {
    slug: 'iterator-for-combination',
    number: 1286,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Ordered Combination Sequence Precomputation',
        text: 'Combinations of fixed length in sorted lexicographical order can be enumerated using recursive backtracking.'
      },
      {
        level: 2,
        title: 'State Pointer over Generated Pool',
        text: 'Precompute all combinations upon initialization and advance an index pointer on next calls.'
      },
      {
        level: 3,
        title: 'Bitmask or Index Combination Blueprint',
        text: 'Iterate through descending binary masks of weight k or advance pointer array [idx_1, idx_2, ..., idx_k] from right to left.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass CombinationIterator:\n    def __init__(self, characters: str, combinationLength: int):\n        self.combs = []\n        self.ptr = 0\n        def backtrack(start, curr):\n            if len(curr) == combinationLength:\n                self.combs.append("".join(curr))\n                return\n            for i in range(start, len(characters)):\n                curr.append(characters[i])\n                backtrack(i + 1, curr)\n                curr.pop()\n        backtrack(0, [])\n\n    def next(self) -> str:\n        res = self.combs[self.ptr]\n        self.ptr += 1\n        return res\n\n    def hasNext(self) -> bool:\n        return self.ptr < len(self.combs)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(C(N, K)) init, O(1) query',
      space: 'O(C(N, K) * K)',
      variables: ['N: string length', 'K: combination length'],
      notes: 'Generating all C(N, K) combinations upfront allows instantaneous O(1) subsequent iterations.',
      whyNaiveFails: 'Re-searching for next lexicographical combination without state requires repeated full permutations.',
      spaceTimeTradeoff: 'Pre-materializing combinations trades memory for O(1) next and hasNext execution.',
      interviewerExpectation: 'Precomputation via backtracking or online index array mutation.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class CombinationIterator:
    def __init__(self, characters: str, combinationLength: int):
        self.combs = []
        self.ptr = 0
        def backtrack(start, curr):
            if len(curr) == combinationLength:
                self.combs.append("".join(curr))
                return
            for i in range(start, len(characters)):
                curr.append(characters[i])
                backtrack(i + 1, curr)
                curr.pop()
        backtrack(0, [])

    def next(self) -> str:
        res = self.combs[self.ptr]
        self.ptr += 1
        return res

    def hasNext(self) -> bool:
        return self.ptr < len(self.combs)`,
        approach: 'Backtracking Precomputation List',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class CombinationIterator {
    vector<string> combs;
    int ptr = 0;
    void backtrack(const string& chars, int len, int start, string& curr) {
        if (curr.size() == len) {
            combs.push_back(curr);
            return;
        }
        for (int i = start; i < chars.size(); i++) {
            curr.push_back(chars[i]);
            backtrack(chars, len, i + 1, curr);
            curr.pop_back();
        }
    }
public:
    CombinationIterator(string characters, int combinationLength) {
        string curr = "";
        backtrack(characters, combinationLength, 0, curr);
    }
    string next() {
        return combs[ptr++];
    }
    bool hasNext() {
        return ptr < combs.size();
    }
};`,
        approach: 'C++ Lexicographical Combination Vector',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class CombinationIterator {
    private List<String> combs = new ArrayList<>();
    private int ptr = 0;

    private void backtrack(String chars, int len, int start, StringBuilder curr) {
        if (curr.length() == len) {
            combs.add(curr.toString());
            return;
        }
        for (int i = start; i < chars.length(); i++) {
            curr.append(chars.charAt(i));
            backtrack(chars, len, i + 1, curr);
            curr.deleteCharAt(curr.length() - 1);
        }
    }

    public CombinationIterator(String characters, int combinationLength) {
        backtrack(characters, combinationLength, 0, new StringBuilder());
    }

    public String next() {
        return combs.get(ptr++);
    }

    public boolean hasNext() {
        return ptr < combs.size();
    }
}`,
        approach: 'Java Backtracked List Iterator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var CombinationIterator = function(characters, combinationLength) {
    this.combs = [];
    this.ptr = 0;
    const backtrack = (start, curr) => {
        if (curr.length === combinationLength) {
            this.combs.push(curr.join(''));
            return;
        }
        for (let i = start; i < characters.length; i++) {
            curr.push(characters[i]);
            backtrack(i + 1, curr);
            curr.pop();
        }
    };
    backtrack(0, []);
};

CombinationIterator.prototype.next = function() {
    return this.combs[this.ptr++];
};

CombinationIterator.prototype.hasNext = function() {
    return this.ptr < this.combs.length;
};`,
        approach: 'JavaScript Combination Backtracking Store',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class CombinationIterator:
    def __init__(self, characters: str, combinationLength: int):
        self.combs = []
        self.ptr = 0
        def backtrack(start, curr):
            if len(curr) == combinationLength:
                self.combs.append("".join(curr))
                return
            for i in range(start, len(characters)):
                curr.append(characters[i])
                backtrack(i + 1, curr)
                curr.pop()
        backtrack(0, [])

    def next(self) -> str:
        res = self.combs[self.ptr]
        self.ptr += 1
        return res

    def hasNext(self) -> bool:
        return self.ptr < len(self.combs)

itr = CombinationIterator("abc", 2)
assert itr.next() == "ab"
assert itr.hasNext() == True
assert itr.next() == "ac"
assert itr.hasNext() == True
assert itr.next() == "bc"
assert itr.hasNext() == False
print("All tests passed successfully.")
`
  },

  // 5. #1307 verbal-arithmetic-puzzle
  {
    slug: 'verbal-arithmetic-puzzle',
    number: 1307,
    category: 'Algorithms',
    patterns: ['backtracking-subsets-perm'],
    hints: [
      {
        level: 1,
        title: 'Column-by-Column Digit Arithmetic',
        text: 'Rather than assigning digits to all letters at once, evaluate addition column by column from units place to leading digits with carry.'
      },
      {
        level: 2,
        title: 'Leading Zero Restriction Check',
        text: 'Leading letters of any multi-digit word or result cannot be mapped to digit 0.'
      },
      {
        level: 3,
        title: 'Backtracking with Column Sum Verification',
        text: 'When moving to the next column, verify sum of column digits plus carry matches target digit modulo 10.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def isSolvable(self, words: list[str], result: str) -> bool:\n        words = [w[::-1] for w in words]\n        result = result[::-1]\n        max_len = max(max(len(w) for w in words), len(result))\n        if len(result) < max(len(w) for w in words):\n            return False\n        non_zero = set()\n        for w in words:\n            if len(w) > 1: non_zero.add(w[-1])\n        if len(result) > 1: non_zero.add(result[-1])\n\n        letter_to_digit = {}\n        used_digits = [False] * 10\n\n        def dfs(col, word_idx, carry):\n            if col == max_len:\n                return carry == 0\n            if word_idx == len(words):\n                res_char = result[col] if col < len(result) else None\n                val = carry % 10\n                nxt_carry = carry // 10\n                if res_char is None:\n                    return val == 0 and dfs(col + 1, 0, nxt_carry)\n                if res_char in letter_to_digit:\n                    if letter_to_digit[res_char] != val:\n                        return False\n                    return dfs(col + 1, 0, nxt_carry)\n                else:\n                    if used_digits[val] or (val == 0 and res_char in non_zero):\n                        return False\n                    letter_to_digit[res_char] = val\n                    used_digits[val] = True\n                    if dfs(col + 1, 0, nxt_carry):\n                        return True\n                    del letter_to_digit[res_char]\n                    used_digits[val] = False\n                    return False\n\n            w = words[word_idx]\n            if col >= len(w):\n                return dfs(col, word_idx + 1, carry)\n            ch = w[col]\n            if ch in letter_to_digit:\n                return dfs(col, word_idx + 1, carry + letter_to_digit[ch])\n            for d in range(10):\n                if not used_digits[d]:\n                    if d == 0 and ch in non_zero:\n                        continue\n                    letter_to_digit[ch] = d\n                    used_digits[d] = True\n                    if dfs(col, word_idx + 1, carry + d):\n                        return True\n                    del letter_to_digit[ch]\n                    used_digits[d] = False\n            return False\n\n        return dfs(0, 0, 0)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(10! / (10 - U)!) bounded by column pruning',
      space: 'O(U + L)',
      variables: ['U: number of unique letters (at most 10)', 'L: max word length'],
      notes: 'Column-wise pruning reduces search state from 10! to a fraction of branches.',
      whyNaiveFails: 'Trying all digit permutations without column verification explores 10! combinations that fail early on units place.',
      spaceTimeTradeoff: 'Column-first backtracking prunes invalid assignments immediately after verifying each decimal position.',
      interviewerExpectation: 'Column-wise addition backtracking with carry propagation and non-zero constraints.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def isSolvable(self, words: list[str], result: str) -> bool:
        words = [w[::-1] for w in words]
        result = result[::-1]
        max_len = max(max(len(w) for w in words), len(result))
        if len(result) < max(len(w) for w in words):
            return False
        non_zero = set()
        for w in words:
            if len(w) > 1: non_zero.add(w[-1])
        if len(result) > 1: non_zero.add(result[-1])

        letter_to_digit = {}
        used_digits = [False] * 10

        def dfs(col, word_idx, carry):
            if col == max_len:
                return carry == 0
            if word_idx == len(words):
                res_char = result[col] if col < len(result) else None
                val = carry % 10
                nxt_carry = carry // 10
                if res_char is None:
                    return val == 0 and dfs(col + 1, 0, nxt_carry)
                if res_char in letter_to_digit:
                    if letter_to_digit[res_char] != val:
                        return False
                    return dfs(col + 1, 0, nxt_carry)
                else:
                    if used_digits[val] or (val == 0 and res_char in non_zero):
                        return False
                    letter_to_digit[res_char] = val
                    used_digits[val] = True
                    if dfs(col + 1, 0, nxt_carry):
                        return True
                    del letter_to_digit[res_char]
                    used_digits[val] = False
                    return False

            w = words[word_idx]
            if col >= len(w):
                return dfs(col, word_idx + 1, carry)
            ch = w[col]
            if ch in letter_to_digit:
                return dfs(col, word_idx + 1, carry + letter_to_digit[ch])
            for d in range(10):
                if not used_digits[d]:
                    if d == 0 and ch in non_zero:
                        continue
                    letter_to_digit[ch] = d
                    used_digits[d] = True
                    if dfs(col, word_idx + 1, carry + d):
                        return True
                    del letter_to_digit[ch]
                    used_digits[d] = False
            return False

        return dfs(0, 0, 0)`,
        approach: 'Column-wise Backtracking with Carry Propagation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    vector<string> W;
    string R;
    int maxLen;
    bool nonZero[26] = {false};
    int letterToDigit[26];
    bool used[10] = {false};

    bool dfs(int col, int wIdx, int carry) {
        if (col == maxLen) return carry == 0;
        if (wIdx == W.size()) {
            int val = carry % 10;
            int nxtCarry = carry / 10;
            if (col >= R.size()) return val == 0 && dfs(col + 1, 0, nxtCarry);
            int ch = R[col] - 'A';
            if (letterToDigit[ch] != -1) {
                if (letterToDigit[ch] != val) return false;
                return dfs(col + 1, 0, nxtCarry);
            }
            if (used[val] || (val == 0 && nonZero[ch])) return false;
            letterToDigit[ch] = val;
            used[val] = true;
            if (dfs(col + 1, 0, nxtCarry)) return true;
            letterToDigit[ch] = -1;
            used[val] = false;
            return false;
        }
        if (col >= W[wIdx].size()) return dfs(col, wIdx + 1, carry);
        int ch = W[wIdx][col] - 'A';
        if (letterToDigit[ch] != -1) return dfs(col, wIdx + 1, carry + letterToDigit[ch]);
        for (int d = 0; d < 10; d++) {
            if (!used[d]) {
                if (d == 0 && nonZero[ch]) continue;
                letterToDigit[ch] = d;
                used[d] = true;
                if (dfs(col, wIdx + 1, carry + d)) return true;
                letterToDigit[ch] = -1;
                used[d] = false;
            }
        }
        return false;
    }
public:
    bool isSolvable(vector<string>& words, string result) {
        W = words;
        R = result;
        int maxW = 0;
        for (auto& w : W) {
            maxW = max(maxW, (int)w.size());
            if (w.size() > 1) nonZero[w[0] - 'A'] = true;
            reverse(w.begin(), w.end());
        }
        if (R.size() < maxW) return false;
        if (R.size() > 1) nonZero[R[0] - 'A'] = true;
        reverse(R.begin(), R.end());
        maxLen = max(maxW, (int)R.size());
        memset(letterToDigit, -1, sizeof(letterToDigit));
        return dfs(0, 0, 0);
    }
};`,
        approach: 'C++ Column Backtracking DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private String[] W;
    private String R;
    private int maxLen;
    private boolean[] nonZero = new boolean[26];
    private int[] letterToDigit = new int[26];
    private boolean[] used = new boolean[10];

    private boolean dfs(int col, int wIdx, int carry) {
        if (col == maxLen) return carry == 0;
        if (wIdx == W.length) {
            int val = carry % 10;
            int nxtCarry = carry / 10;
            if (col >= R.length()) return val == 0 && dfs(col + 1, 0, nxtCarry);
            int ch = R.charAt(col) - 'A';
            if (letterToDigit[ch] != -1) {
                if (letterToDigit[ch] != val) return false;
                return dfs(col + 1, 0, nxtCarry);
            }
            if (used[val] || (val == 0 && nonZero[ch])) return false;
            letterToDigit[ch] = val;
            used[val] = true;
            if (dfs(col + 1, 0, nxtCarry)) return true;
            letterToDigit[ch] = -1;
            used[val] = false;
            return false;
        }
        if (col >= W[wIdx].length()) return dfs(col, wIdx + 1, carry);
        int ch = W[wIdx].charAt(col) - 'A';
        if (letterToDigit[ch] != -1) return dfs(col, wIdx + 1, carry + letterToDigit[ch]);
        for (int d = 0; d < 10; d++) {
            if (!used[d]) {
                if (d == 0 && nonZero[ch]) continue;
                letterToDigit[ch] = d;
                used[d] = true;
                if (dfs(col, wIdx + 1, carry + d)) return true;
                letterToDigit[ch] = -1;
                used[d] = false;
            }
        }
        return false;
    }

    public boolean isSolvable(String[] words, String result) {
        W = new String[words.length];
        int maxW = 0;
        for (int i = 0; i < words.length; i++) {
            maxW = Math.max(maxW, words[i].length());
            if (words[i].length() > 1) nonZero[words[i].charAt(0) - 'A'] = true;
            W[i] = new StringBuilder(words[i]).reverse().toString();
        }
        if (result.length() < maxW) return false;
        if (result.length() > 1) nonZero[result.charAt(0) - 'A'] = true;
        R = new StringBuilder(result).reverse().toString();
        maxLen = Math.max(maxW, R.length());
        Arrays.fill(letterToDigit, -1);
        return dfs(0, 0, 0);
    }
}`,
        approach: 'Java Column Arithmetic Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var isSolvable = function(words, result) {
    const W = words.map(w => w.split('').reverse().join(''));
    const R = result.split('').reverse().join('');
    let maxW = 0;
    const nonZero = new Set();
    for (const w of words) {
        maxW = Math.max(maxW, w.length);
        if (w.length > 1) nonZero.add(w[0]);
    }
    if (result.length < maxW) return false;
    if (result.length > 1) nonZero.add(result[0]);
    const maxLen = Math.max(maxW, R.length);
    const letterToDigit = {};
    const used = Array(10).fill(false);

    function dfs(col, wIdx, carry) {
        if (col === maxLen) return carry === 0;
        if (wIdx === W.length) {
            const val = carry % 10;
            const nxtCarry = Math.floor(carry / 10);
            if (col >= R.length) return val === 0 && dfs(col + 1, 0, nxtCarry);
            const ch = R[col];
            if (ch in letterToDigit) {
                if (letterToDigit[ch] !== val) return false;
                return dfs(col + 1, 0, nxtCarry);
            }
            if (used[val] || (val === 0 && nonZero.has(ch))) return false;
            letterToDigit[ch] = val;
            used[val] = true;
            if (dfs(col + 1, 0, nxtCarry)) return true;
            delete letterToDigit[ch];
            used[val] = false;
            return false;
        }
        if (col >= W[wIdx].length) return dfs(col, wIdx + 1, carry);
        const ch = W[wIdx][col];
        if (ch in letterToDigit) return dfs(col, wIdx + 1, carry + letterToDigit[ch]);
        for (let d = 0; d < 10; d++) {
            if (!used[d]) {
                if (d === 0 && nonZero.has(ch)) continue;
                letterToDigit[ch] = d;
                used[d] = true;
                if (dfs(col, wIdx + 1, carry + d)) return true;
                delete letterToDigit[ch];
                used[d] = false;
            }
        }
        return false;
    }
    return dfs(0, 0, 0);
};`,
        approach: 'JavaScript Column Constraint Backtracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Solution:
    def isSolvable(self, words: list[str], result: str) -> bool:
        words = [w[::-1] for w in words]
        result = result[::-1]
        max_len = max(max(len(w) for w in words), len(result))
        if len(result) < max(len(w) for w in words):
            return False
        non_zero = set()
        for w in words:
            if len(w) > 1: non_zero.add(w[-1])
        if len(result) > 1: non_zero.add(result[-1])

        letter_to_digit = {}
        used_digits = [False] * 10

        def dfs(col, word_idx, carry):
            if col == max_len:
                return carry == 0
            if word_idx == len(words):
                res_char = result[col] if col < len(result) else None
                val = carry % 10
                nxt_carry = carry // 10
                if res_char is None:
                    return val == 0 and dfs(col + 1, 0, nxt_carry)
                if res_char in letter_to_digit:
                    if letter_to_digit[res_char] != val:
                        return False
                    return dfs(col + 1, 0, nxt_carry)
                else:
                    if used_digits[val] or (val == 0 and res_char in non_zero):
                        return False
                    letter_to_digit[res_char] = val
                    used_digits[val] = True
                    if dfs(col + 1, 0, nxt_carry):
                        return True
                    del letter_to_digit[res_char]
                    used_digits[val] = False
                    return False

            w = words[word_idx]
            if col >= len(w):
                return dfs(col, word_idx + 1, carry)
            ch = w[col]
            if ch in letter_to_digit:
                return dfs(col, word_idx + 1, carry + letter_to_digit[ch])
            for d in range(10):
                if not used_digits[d]:
                    if d == 0 and ch in non_zero:
                        continue
                    letter_to_digit[ch] = d
                    used_digits[d] = True
                    if dfs(col, word_idx + 1, carry + d):
                        return True
                    del letter_to_digit[ch]
                    used_digits[d] = False
            return False

        return dfs(0, 0, 0)

sol = Solution()
assert sol.isSolvable(["SEND","MORE"], "MONEY") == True
assert sol.isSolvable(["SIX","SEVEN","SEVEN"], "TWENTY") == True
assert sol.isSolvable(["LEET","CODE"], "POINT") == False
print("All tests passed successfully.")
`
  },

  // 6. #1330 reverse-subarray-to-maximize-array-value
  {
    slug: 'reverse-subarray-to-maximize-array-value',
    number: 1330,
    category: 'Algorithms',
    patterns: ['greedy-general'],
    hints: [
      {
        level: 1,
        title: 'Boundary Delta Formulation',
        text: 'Reversing subarray nums[L..R] only alters two adjacent difference terms: |nums[L-1] - nums[R]| and |nums[L] - nums[R+1]|.'
      },
      {
        level: 2,
        title: 'Interval Overlap Algebra',
        text: 'For interior reversals, the change equals 2 * max(0, min(pair_max) - max(pair_min)) across disjoint interval pairs.'
      },
      {
        level: 3,
        title: 'Prefix and Suffix Boundary Edge Cases',
        text: 'Explicitly check boundary reversals where L=0 or R=N-1 to catch changes that only affect one interval interface.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def maxValueAfterReverse(self, nums: list[int]) -> int:\n        base = sum(abs(nums[i] - nums[i + 1]) for i in range(len(nums) - 1))\n        n = len(nums)\n        res = base\n\n        for i in range(n - 1):\n            res = max(res, base - abs(nums[i] - nums[i + 1]) + abs(nums[0] - nums[i + 1]))\n            res = max(res, base - abs(nums[i] - nums[i + 1]) + abs(nums[-1] - nums[i]))\n\n        min_hi = float(\"inf\")\n        max_lo = float(\"-inf\")\n        for i in range(n - 1):\n            a, b = nums[i], nums[i + 1]\n            min_hi = min(min_hi, max(a, b))\n            max_lo = max(max_lo, min(a, b))\n\n        return max(res, base + max(0, (max_lo - min_hi) * 2))\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: array length'],
      notes: 'Single linear pass computes the interval extrema and prefix/suffix boundary maximums in O(1) auxiliary memory.',
      whyNaiveFails: 'Testing all O(N^2) subarray reversal pairs causes Time Limit Exceeded on N=30,000.',
      spaceTimeTradeoff: 'Interval algebra decomposes the quadratic pair comparison into decoupled minimums and maximums.',
      interviewerExpectation: 'Interval overlap simplification and separate consideration of edge reversals.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def maxValueAfterReverse(self, nums: list[int]) -> int:
        base = sum(abs(nums[i] - nums[i + 1]) for i in range(len(nums) - 1))
        n = len(nums)
        res = base

        for i in range(n - 1):
            res = max(res, base - abs(nums[i] - nums[i + 1]) + abs(nums[0] - nums[i + 1]))
            res = max(res, base - abs(nums[i] - nums[i + 1]) + abs(nums[-1] - nums[i]))

        min_hi = float("inf")
        max_lo = float("-inf")
        for i in range(n - 1):
            a, b = nums[i], nums[i + 1]
            min_hi = min(min_hi, max(a, b))
            max_lo = max(max_lo, min(a, b))

        return max(res, base + max(0, (max_lo - min_hi) * 2))`,
        approach: 'Interval Overlap Optimization in Linear Time',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int maxValueAfterReverse(vector<int>& nums) {
        int n = nums.size();
        int base = 0;
        for (int i = 0; i < n - 1; i++) base += abs(nums[i] - nums[i + 1]);
        int res = base;
        for (int i = 0; i < n - 1; i++) {
            res = max(res, base - abs(nums[i] - nums[i + 1]) + abs(nums[0] - nums[i + 1]));
            res = max(res, base - abs(nums[i] - nums[i + 1]) + abs(nums[n - 1] - nums[i]));
        }
        int minHi = INT_MAX, maxLo = INT_MIN;
        for (int i = 0; i < n - 1; i++) {
            minHi = min(minHi, max(nums[i], nums[i + 1]));
            maxLo = max(maxLo, min(nums[i], nums[i + 1]));
        }
        return max(res, base + max(0, (maxLo - minHi) * 2));
    }
};`,
        approach: 'C++ Single Pass Interval Min-Max Calculation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int maxValueAfterReverse(int[] nums) {
        int n = nums.length;
        int base = 0;
        for (int i = 0; i < n - 1; i++) base += Math.abs(nums[i] - nums[i + 1]);
        int res = base;
        for (int i = 0; i < n - 1; i++) {
            res = Math.max(res, base - Math.abs(nums[i] - nums[i + 1]) + Math.abs(nums[0] - nums[i + 1]));
            res = Math.max(res, base - Math.abs(nums[i] - nums[i + 1]) + Math.abs(nums[n - 1] - nums[i]));
        }
        int minHi = Integer.MAX_VALUE, maxLo = Integer.MIN_VALUE;
        for (int i = 0; i < n - 1; i++) {
            minHi = Math.min(minHi, Math.max(nums[i], nums[i + 1]));
            maxLo = Math.max(maxLo, Math.min(nums[i], nums[i + 1]));
        }
        return Math.max(res, base + Math.max(0, (maxLo - minHi) * 2));
    }
}`,
        approach: 'Java Boundary and Interval Extrema',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var maxValueAfterReverse = function(nums) {
    const n = nums.length;
    let base = 0;
    for (let i = 0; i < n - 1; i++) base += Math.abs(nums[i] - nums[i + 1]);
    let res = base;
    for (let i = 0; i < n - 1; i++) {
        res = Math.max(res, base - Math.abs(nums[i] - nums[i + 1]) + Math.abs(nums[0] - nums[i + 1]));
        res = Math.max(res, base - Math.abs(nums[i] - nums[i + 1]) + Math.abs(nums[n - 1] - nums[i]));
    }
    let minHi = Infinity, maxLo = -Infinity;
    for (let i = 0; i < n - 1; i++) {
        minHi = Math.min(minHi, Math.max(nums[i], nums[i + 1]));
        maxLo = Math.max(maxLo, Math.min(nums[i], nums[i + 1]));
    }
    return Math.max(res, base + Math.max(0, (maxLo - minHi) * 2));
};`,
        approach: 'JavaScript O(N) Interval Distance Maxima',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Solution:
    def maxValueAfterReverse(self, nums: list[int]) -> int:
        base = sum(abs(nums[i] - nums[i + 1]) for i in range(len(nums) - 1))
        n = len(nums)
        res = base

        for i in range(n - 1):
            res = max(res, base - abs(nums[i] - nums[i + 1]) + abs(nums[0] - nums[i + 1]))
            res = max(res, base - abs(nums[i] - nums[i + 1]) + abs(nums[-1] - nums[i]))

        min_hi = float("inf")
        max_lo = float("-inf")
        for i in range(n - 1):
            a, b = nums[i], nums[i + 1]
            min_hi = min(min_hi, max(a, b))
            max_lo = max(max_lo, min(a, b))

        return max(res, base + max(0, (max_lo - min_hi) * 2))

sol = Solution()
assert sol.maxValueAfterReverse([2, 3, 1, 5, 4]) == 10
assert sol.maxValueAfterReverse([2, 4, 9, 24, 2, 1, 10]) == 68
print("All tests passed successfully.")
`
  },

  // 7. #1348 tweet-counts-per-frequency
  {
    slug: 'tweet-counts-per-frequency',
    number: 1348,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Time Bucket Frequency Partitioning',
        text: 'Record occurrences under their tweet name and categorize timestamps into minute, hour, or day chunks.'
      },
      {
        level: 2,
        title: 'Binary Search or Bucket Tallying',
        text: 'Divide the interval [startTime, endTime] into fixed-length windows and count events falling in each slot.'
      },
      {
        level: 3,
        title: 'Interval Delta Mapping Blueprint',
        text: 'Determine chunk step size (60, 3600, or 86400). Create an array of size ceil((endTime - startTime + 1) / step) and populate counts.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport bisect\n\nclass TweetCounts:\n    def __init__(self):\n        self.tweets = {}\n\n    def recordTweet(self, tweetName: str, time: int) -> None:\n        if tweetName not in self.tweets:\n            self.tweets[tweetName] = []\n        bisect.insort(self.tweets[tweetName], time)\n\n    def getTweetCountsPerFrequency(self, freq: str, tweetName: str, startTime: int, endTime: int) -> list[int]:\n        delta = 60 if freq == "minute" else (3600 if freq == "hour" else 86400)\n        times = self.tweets.get(tweetName, [])\n        ans = []\n        cur = startTime\n        while cur <= endTime:\n            nxt = min(cur + delta, endTime + 1)\n            left = bisect.bisect_left(times, cur)\n            right = bisect.bisect_left(times, nxt)\n            ans.append(right - left)\n            cur = nxt\n        return ans\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log N + N) record, O(B * log N) query',
      space: 'O(T)',
      variables: ['N: number of timestamps for tweet', 'B: number of buckets in query', 'T: total recorded tweets'],
      notes: 'Bisection identifies bucket boundaries in logarithmic time per chunk interval.',
      whyNaiveFails: 'Full unsorted scans across millions of events yield linear per-query latencies.',
      spaceTimeTradeoff: 'Sorted timestamp lists enable range count difference via binary search.',
      interviewerExpectation: 'Correct frequency delta mapping and bisect range boundaries.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import bisect

class TweetCounts:
    def __init__(self):
        self.tweets = {}

    def recordTweet(self, tweetName: str, time: int) -> None:
        if tweetName not in self.tweets:
            self.tweets[tweetName] = []
        bisect.insort(self.tweets[tweetName], time)

    def getTweetCountsPerFrequency(self, freq: str, tweetName: str, startTime: int, endTime: int) -> list[int]:
        delta = 60 if freq == "minute" else (3600 if freq == "hour" else 86400)
        times = self.tweets.get(tweetName, [])
        ans = []
        cur = startTime
        while cur <= endTime:
            nxt = min(cur + delta, endTime + 1)
            left = bisect.bisect_left(times, cur)
            right = bisect.bisect_left(times, nxt)
            ans.append(right - left)
            cur = nxt
        return ans`,
        approach: 'Sorted List with Bisect Range Queries',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class TweetCounts {
    unordered_map<string, multiset<int>> tweets;
public:
    TweetCounts() {}
    void recordTweet(string tweetName, int time) {
        tweets[tweetName].insert(time);
    }
    vector<int> getTweetCountsPerFrequency(string freq, string tweetName, int startTime, int endTime) {
        int delta = (freq == "minute") ? 60 : ((freq == "hour") ? 3600 : 86400);
        vector<int> ans;
        if (!tweets.count(tweetName)) {
            for (int t = startTime; t <= endTime; t += delta) ans.push_back(0);
            return ans;
        }
        auto& s = tweets[tweetName];
        for (int cur = startTime; cur <= endTime; cur += delta) {
            int nxt = min(cur + delta - 1, endTime);
            auto it1 = s.lower_bound(cur);
            auto it2 = s.upper_bound(nxt);
            ans.push_back(distance(it1, it2));
        }
        return ans;
    }
};`,
        approach: 'C++ Multiset Lower/Upper Bound Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class TweetCounts {
    private Map<String, List<Integer>> tweets = new HashMap<>();

    public TweetCounts() {}

    public void recordTweet(String tweetName, int time) {
        tweets.computeIfAbsent(tweetName, k -> new ArrayList<>());
        List<Integer> list = tweets.get(tweetName);
        int idx = Collections.binarySearch(list, time);
        if (idx < 0) idx = -(idx + 1);
        list.add(idx, time);
    }

    public List<Integer> getTweetCountsPerFrequency(String freq, String tweetName, int startTime, int endTime) {
        int delta = freq.equals("minute") ? 60 : (freq.equals("hour") ? 3600 : 86400);
        List<Integer> ans = new ArrayList<>();
        List<Integer> times = tweets.getOrDefault(tweetName, Collections.emptyList());
        int cur = startTime;
        while (cur <= endTime) {
            int nxt = Math.min(cur + delta, endTime + 1);
            int left = Collections.binarySearch(times, cur);
            if (left < 0) left = -(left + 1);
            int right = Collections.binarySearch(times, nxt);
            if (right < 0) right = -(right + 1);
            ans.add(right - left);
            cur = nxt;
        }
        return ans;
    }
}`,
        approach: 'Java Sorted ArrayList with Binary Search Range',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var TweetCounts = function() {
    this.tweets = new Map();
};

TweetCounts.prototype.recordTweet = function(tweetName, time) {
    if (!this.tweets.has(tweetName)) this.tweets.set(tweetName, []);
    const arr = this.tweets.get(tweetName);
    let l = 0, r = arr.length;
    while (l < r) {
        const m = Math.floor((l + r) / 2);
        if (arr[m] < time) l = m + 1;
        else r = m;
    }
    arr.splice(l, 0, time);
};

TweetCounts.prototype.getTweetCountsPerFrequency = function(freq, tweetName, startTime, endTime) {
    const delta = freq === 'minute' ? 60 : (freq === 'hour' ? 3600 : 86400);
    const arr = this.tweets.get(tweetName) || [];
    const ans = [];
    let cur = startTime;
    while (cur <= endTime) {
        const nxt = Math.min(cur + delta, endTime + 1);
        let l1 = 0, r1 = arr.length;
        while (l1 < r1) {
            const m = Math.floor((l1 + r1) / 2);
            if (arr[m] < cur) l1 = m + 1;
            else r1 = m;
        }
        let l2 = 0, r2 = arr.length;
        while (l2 < r2) {
            const m = Math.floor((l2 + r2) / 2);
            if (arr[m] < nxt) l2 = m + 1;
            else r2 = m;
        }
        ans.push(l2 - l1);
        cur = nxt;
    }
    return ans;
};`,
        approach: 'JavaScript Binary Search Insertion and Range Count',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import bisect

class TweetCounts:
    def __init__(self):
        self.tweets = {}

    def recordTweet(self, tweetName: str, time: int) -> None:
        if tweetName not in self.tweets:
            self.tweets[tweetName] = []
        bisect.insort(self.tweets[tweetName], time)

    def getTweetCountsPerFrequency(self, freq: str, tweetName: str, startTime: int, endTime: int) -> list[int]:
        delta = 60 if freq == "minute" else (3600 if freq == "hour" else 86400)
        times = self.tweets.get(tweetName, [])
        ans = []
        cur = startTime
        while cur <= endTime:
            nxt = min(cur + delta, endTime + 1)
            left = bisect.bisect_left(times, cur)
            right = bisect.bisect_left(times, nxt)
            ans.append(right - left)
            cur = nxt
        return ans

tc = TweetCounts()
tc.recordTweet("tweet3", 0)
tc.recordTweet("tweet3", 60)
tc.recordTweet("tweet3", 10)
assert tc.getTweetCountsPerFrequency("minute", "tweet3", 0, 59) == [2]
assert tc.getTweetCountsPerFrequency("minute", "tweet3", 0, 60) == [2, 1]
print("All tests passed successfully.")
`
  },

  // 8. #1352 product-of-the-last-k-numbers
  {
    slug: 'product-of-the-last-k-numbers',
    number: 1352,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Prefix Product Division Strategy',
        text: 'Cumulative product array allows computing any suffix product by dividing the total prefix product by an earlier prefix product.'
      },
      {
        level: 2,
        title: 'Zero Multiplication Reset',
        text: 'Adding zero invalidates all prior products. Reset the prefix array whenever zero is encountered.'
      },
      {
        level: 3,
        title: 'Constant Time Evaluation Blueprint',
        text: 'If k is greater than or equal to current prefix length, the window spans across a zero, so return 0. Otherwise return prefix[-1] // prefix[-1 - k].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass ProductOfNumbers:\n    def __init__(self):\n        self.prefix = [1]\n\n    def add(self, num: int) -> None:\n        if num == 0:\n            self.prefix = [1]\n        else:\n            self.prefix.append(self.prefix[-1] * num)\n\n    def getProduct(self, k: int) -> int:\n        if k >= len(self.prefix):\n            return 0\n        return self.prefix[-1] // self.prefix[-1 - k]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) add, O(1) getProduct',
      space: 'O(N)',
      variables: ['N: number of added values'],
      notes: 'Every operation executes in strict O(1) time using cumulative prefix multiplication.',
      whyNaiveFails: 'Multiplying last k elements directly on every call takes O(K) time per query, timing out under 40,000 queries.',
      spaceTimeTradeoff: 'Storing running prefix products reduces suffix product to a single arithmetic division.',
      interviewerExpectation: 'Handling of zeroes by resetting prefix array and O(1) division.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class ProductOfNumbers:
    def __init__(self):
        self.prefix = [1]

    def add(self, num: int) -> None:
        if num == 0:
            self.prefix = [1]
        else:
            self.prefix.append(self.prefix[-1] * num)

    def getProduct(self, k: int) -> int:
        if k >= len(self.prefix):
            return 0
        return self.prefix[-1] // self.prefix[-1 - k]`,
        approach: 'Prefix Product Array with Zero Reset',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class ProductOfNumbers {
    vector<int> prefix;
public:
    ProductOfNumbers() {
        prefix = {1};
    }
    void add(int num) {
        if (num == 0) prefix = {1};
        else prefix.push_back(prefix.back() * num);
    }
    int getProduct(int k) {
        if (k >= prefix.size()) return 0;
        return prefix.back() / prefix[prefix.size() - 1 - k];
    }
};`,
        approach: 'C++ Running Prefix Product Vector',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class ProductOfNumbers {
    private List<Integer> prefix;

    public ProductOfNumbers() {
        prefix = new ArrayList<>();
        prefix.add(1);
    }

    public void add(int num) {
        if (num == 0) {
            prefix.clear();
            prefix.add(1);
        } else {
            prefix.add(prefix.get(prefix.size() - 1) * num);
        }
    }

    public int getProduct(int k) {
        if (k >= prefix.size()) return 0;
        return prefix.get(prefix.size() - 1) / prefix.get(prefix.size() - 1 - k);
    }
}`,
        approach: 'Java Dynamic Prefix Division List',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var ProductOfNumbers = function() {
    this.prefix = [1];
};

ProductOfNumbers.prototype.add = function(num) {
    if (num === 0) {
        this.prefix = [1];
    } else {
        this.prefix.push(this.prefix[this.prefix.length - 1] * num);
    }
};

ProductOfNumbers.prototype.getProduct = function(k) {
    if (k >= this.prefix.length) return 0;
    return Math.floor(this.prefix[this.prefix.length - 1] / this.prefix[this.prefix.length - 1 - k]);
};`,
        approach: 'JavaScript Prefix Multiplier Buffer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class ProductOfNumbers:
    def __init__(self):
        self.prefix = [1]

    def add(self, num: int) -> None:
        if num == 0:
            self.prefix = [1]
        else:
            self.prefix.append(self.prefix[-1] * num)

    def getProduct(self, k: int) -> int:
        if k >= len(self.prefix):
            return 0
        return self.prefix[-1] // self.prefix[-1 - k]

p = ProductOfNumbers()
p.add(3)
p.add(0)
p.add(2)
p.add(5)
p.add(4)
assert p.getProduct(2) == 20
assert p.getProduct(3) == 40
assert p.getProduct(4) == 0
p.add(8)
assert p.getProduct(2) == 32
print("All tests passed successfully.")
`
  },

  // 9. #1357 apply-discount-every-n-orders
  {
    slug: 'apply-discount-every-n-orders',
    number: 1357,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Customer Order Counter and Price Lookup',
        text: 'Maintain an incremental counter of customers served and map product identifiers directly to their prices.'
      },
      {
        level: 2,
        title: 'Modulo Discount Application',
        text: 'When customer count modulo n equals 0, scale the bill total by (100 - discount) / 100.'
      },
      {
        level: 3,
        title: 'Cashier State Blueprint',
        text: 'Store price_map[product_id]. Increment count in getBill. Sum prices times quantities. If count % n == 0, multiply sum by (1 - discount / 100).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Cashier:\n    def __init__(self, n: int, discount: int, products: list[int], prices: list[int]):\n        self.n = n\n        self.discount = discount\n        self.count = 0\n        self.price_map = {p: pr for p, pr in zip(products, prices)}\n\n    def getBill(self, product: list[int], amount: list[int]) -> float:\n        self.count += 1\n        total = sum(self.price_map[p] * a for p, a in zip(product, amount))\n        if self.count % self.n == 0:\n            total -= (self.discount * total) / 100.0\n        return total\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(P) init, O(M) getBill',
      space: 'O(P)',
      variables: ['P: number of registered products', 'M: number of purchased items in order'],
      notes: 'Price map allows direct O(1) unit price lookup for each ordered item.',
      whyNaiveFails: 'Linear product scans for each item in an order lead to O(M * P) query time.',
      spaceTimeTradeoff: 'Key-value price index provides O(1) item price resolution.',
      interviewerExpectation: 'Clean hash map construction and accurate floating point discount calculation.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Cashier:
    def __init__(self, n: int, discount: int, products: list[int], prices: list[int]):
        self.n = n
        self.discount = discount
        self.count = 0
        self.price_map = {p: pr for p, pr in zip(products, prices)}

    def getBill(self, product: list[int], amount: list[int]) -> float:
        self.count += 1
        total = sum(self.price_map[p] * a for p, a in zip(product, amount))
        if self.count % self.n == 0:
            total -= (self.discount * total) / 100.0
        return total`,
        approach: 'Product Price Map with Modulo Counter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Cashier {
    int n, discount, count = 0;
    unordered_map<int, int> priceMap;
public:
    Cashier(int n, int discount, vector<int>& products, vector<int>& prices) 
        : n(n), discount(discount) {
        for (int i = 0; i < products.size(); i++) {
            priceMap[products[i]] = prices[i];
        }
    }
    double getBill(vector<int> product, vector<int> amount) {
        count++;
        double total = 0;
        for (int i = 0; i < product.size(); i++) {
            total += priceMap[product[i]] * amount[i];
        }
        if (count % n == 0) {
            total -= (discount * total) / 100.0;
        }
        return total;
    }
};`,
        approach: 'C++ Hash Map Price Table',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Cashier {
    private int n, discount, count = 0;
    private Map<Integer, Integer> priceMap = new HashMap<>();

    public Cashier(int n, int discount, int[] products, int[] prices) {
        this.n = n;
        this.discount = discount;
        for (int i = 0; i < products.length; i++) {
            priceMap.put(products[i], prices[i]);
        }
    }

    public double getBill(int[] product, int[] amount) {
        count++;
        double total = 0;
        for (int i = 0; i < product.length; i++) {
            total += priceMap.get(product[i]) * amount[i];
        }
        if (count % n == 0) {
            total -= (discount * total) / 100.0;
        }
        return total;
    }
}`,
        approach: 'Java HashMap Cashier Register',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var Cashier = function(n, discount, products, prices) {
    this.n = n;
    this.discount = discount;
    this.count = 0;
    this.priceMap = new Map();
    for (let i = 0; i < products.length; i++) {
        this.priceMap.set(products[i], prices[i]);
    }
};

Cashier.prototype.getBill = function(product, amount) {
    this.count++;
    let total = 0;
    for (let i = 0; i < product.length; i++) {
        total += this.priceMap.get(product[i]) * amount[i];
    }
    if (this.count % this.n === 0) {
        total -= (this.discount * total) / 100.0;
    }
    return total;
};`,
        approach: 'JavaScript Map Discount Evaluator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Cashier:
    def __init__(self, n: int, discount: int, products: list[int], prices: list[int]):
        self.n = n
        self.discount = discount
        self.count = 0
        self.price_map = {p: pr for p, pr in zip(products, prices)}

    def getBill(self, product: list[int], amount: list[int]) -> float:
        self.count += 1
        total = sum(self.price_map[p] * a for p, a in zip(product, amount))
        if self.count % self.n == 0:
            total -= (self.discount * total) / 100.0
        return total

c = Cashier(3, 50, [1, 2, 3, 4, 5, 6, 7], [100, 200, 300, 400, 300, 200, 100])
assert c.getBill([1, 2], [1, 2]) == 500.0
assert c.getBill([3, 7], [10, 10]) == 4000.0
assert abs(c.getBill([1, 2, 3, 4, 5, 6, 7], [1, 1, 1, 1, 1, 1, 1]) - 800.0) < 1e-5
print("All tests passed successfully.")
`
  },

  // 10. #1379 find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree
  {
    slug: 'find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree',
    number: 1379,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Synchronous Parallel Tree Traversal',
        text: 'Traverse original and cloned binary trees in lockstep. The node in the clone matching the original traversal target is the answer.'
      },
      {
        level: 2,
        title: 'Pointer Identity Comparison',
        text: 'When original node equals target reference, return the current cloned node reference.'
      },
      {
        level: 3,
        title: 'Recursive Search Blueprint',
        text: 'If original is null, return null. If original is target, return cloned. Search left; if found return it, otherwise search right.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def getTargetCopy(self, original: \'TreeNode\', cloned: \'TreeNode\', target: \'TreeNode\') -> \'TreeNode\':\n        if not original:\n            return None\n        if original is target:\n            return cloned\n        return self.getTargetCopy(original.left, cloned.left, target) or self.getTargetCopy(original.right, cloned.right, target)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(H)',
      variables: ['N: number of nodes in tree', 'H: height of tree'],
      notes: 'Visits each node once in the worst case until target reference is matched.',
      whyNaiveFails: 'Searching value alone fails when duplicate tree values exist across multiple distinct nodes.',
      spaceTimeTradeoff: 'Dual traversal consumes recursion stack proportional to tree height H.',
      interviewerExpectation: 'Reference identity checking rather than value comparison to handle duplicate values.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def getTargetCopy(self, original: 'TreeNode', cloned: 'TreeNode', target: 'TreeNode') -> 'TreeNode':
        if not original:
            return None
        if original is target:
            return cloned
        return self.getTargetCopy(original.left, cloned.left, target) or self.getTargetCopy(original.right, cloned.right, target)`,
        approach: 'Parallel Tree Lockstep Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    TreeNode* getTargetCopy(TreeNode* original, TreeNode* cloned, TreeNode* target) {
        if (!original) return nullptr;
        if (original == target) return cloned;
        TreeNode* left = getTargetCopy(original->left, cloned->left, target);
        if (left) return left;
        return getTargetCopy(original->right, cloned->right, target);
    }
};`,
        approach: 'C++ Parallel Pre-Order Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public final TreeNode getTargetCopy(final TreeNode original, final TreeNode cloned, final TreeNode target) {
        if (original == null) return null;
        if (original == target) return cloned;
        TreeNode left = getTargetCopy(original.left, cloned.left, target);
        if (left != null) return left;
        return getTargetCopy(original.right, cloned.right, target);
    }
}`,
        approach: 'Java Lockstep Reference Match',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var getTargetCopy = function(original, cloned, target) {
    if (!original) return null;
    if (original === target) return cloned;
    return getTargetCopy(original.left, cloned.left, target) || getTargetCopy(original.right, cloned.right, target);
};`,
        approach: 'JavaScript Dual Recursive Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def getTargetCopy(self, original: TreeNode, cloned: TreeNode, target: TreeNode) -> TreeNode:
        if not original:
            return None
        if original is target:
            return cloned
        return self.getTargetCopy(original.left, cloned.left, target) or self.getTargetCopy(original.right, cloned.right, target)

# Tree: 7 -> (4, 3 -> (None, 19))
orig_r = TreeNode(19)
orig = TreeNode(7, TreeNode(4), TreeNode(3, None, orig_r))
clone_r = TreeNode(19)
clone = TreeNode(7, TreeNode(4), TreeNode(3, None, clone_r))

sol = Solution()
assert sol.getTargetCopy(orig, clone, orig_r) is clone_r
print("All tests passed successfully.")
`
  },

  // 11. #1381 design-a-stack-with-increment-operation
  {
    slug: 'design-a-stack-with-increment-operation',
    number: 1381,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Lazy Increment Propagation Strategy',
        text: 'Rather than updating k elements eagerly, record delta increments lazily to keep increment operations constant time.'
      },
      {
        level: 2,
        title: 'Delta Forwarding upon Pop',
        text: 'Maintain an auxiliary delta array. When popping element at index i, add delta[i] to value and forward delta[i] down to delta[i - 1].'
      },
      {
        level: 3,
        title: 'Custom Stack Operations Blueprint',
        text: 'push appends val and delta 0 if size < maxSize. pop returns val + delta[idx] while forwarding delta down. inc(k, val) adds val to delta[min(k-1, size-1)].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass CustomStack:\n    def __init__(self, maxSize: int):\n        self.max_size = maxSize\n        self.stack = []\n        self.inc = []\n\n    def push(self, x: int) -> None:\n        if len(self.stack) < self.max_size:\n            self.stack.append(x)\n            self.inc.append(0)\n\n    def pop(self) -> int:\n        if not self.stack:\n            return -1\n        idx = len(self.stack) - 1\n        diff = self.inc.pop()\n        if idx > 0:\n            self.inc[-1] += diff\n        return self.stack.pop() + diff\n\n    def increment(self, k: int, val: int) -> None:\n        idx = min(k, len(self.stack)) - 1\n        if idx >= 0:\n            self.inc[idx] += val\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) push, O(1) pop, O(1) increment',
      space: 'O(M)',
      variables: ['M: maxSize of the stack'],
      notes: 'All operations achieve strict O(1) time complexity through lazy propagation of increments.',
      whyNaiveFails: 'Iterating up to k elements on each increment call leads to O(K) time per operation, causing high overhead under 1,000 operations.',
      spaceTimeTradeoff: 'Parallel increment array caches pending additions until elements are popped.',
      interviewerExpectation: 'Lazy delta forwarding from top to bottom on pop for O(1) increment.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class CustomStack:
    def __init__(self, maxSize: int):
        self.max_size = maxSize
        self.stack = []
        self.inc = []

    def push(self, x: int) -> None:
        if len(self.stack) < self.max_size:
            self.stack.append(x)
            self.inc.append(0)

    def pop(self) -> int:
        if not self.stack:
            return -1
        idx = len(self.stack) - 1
        diff = self.inc.pop()
        if idx > 0:
            self.inc[-1] += diff
        return self.stack.pop() + diff

    def increment(self, k: int, val: int) -> None:
        idx = min(k, len(self.stack)) - 1
        if idx >= 0:
            self.inc[idx] += val`,
        approach: 'Lazy Delta Propagation Array',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class CustomStack {
    int maxSize;
    vector<int> st, inc;
public:
    CustomStack(int maxSize) : maxSize(maxSize) {}
    void push(int x) {
        if (st.size() < maxSize) {
            st.push_back(x);
            inc.push_back(0);
        }
    }
    int pop() {
        if (st.empty()) return -1;
        int idx = st.size() - 1;
        int diff = inc.back();
        inc.pop_back();
        if (idx > 0) inc.back() += diff;
        int val = st.back() + diff;
        st.pop_back();
        return val;
    }
    void increment(int k, int val) {
        int idx = min(k, (int)st.size()) - 1;
        if (idx >= 0) inc[idx] += val;
    }
};`,
        approach: 'C++ Lazy Delta Vector Forwarding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class CustomStack {
    private int maxSize;
    private int[] st, inc;
    private int top = -1;

    public CustomStack(int maxSize) {
        this.maxSize = maxSize;
        this.st = new int[maxSize];
        this.inc = new int[maxSize];
    }

    public void push(int x) {
        if (top + 1 < maxSize) {
            top++;
            st[top] = x;
            inc[top] = 0;
        }
    }

    public int pop() {
        if (top < 0) return -1;
        int val = st[top] + inc[top];
        if (top > 0) inc[top - 1] += inc[top];
        top--;
        return val;
    }

    public void increment(int k, int val) {
        int idx = Math.min(k - 1, top);
        if (idx >= 0) inc[idx] += val;
    }
}`,
        approach: 'Java Fixed Array Stack with Lazy Increments',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var CustomStack = function(maxSize) {
    this.maxSize = maxSize;
    this.st = [];
    this.inc = [];
};

CustomStack.prototype.push = function(x) {
    if (this.st.length < this.maxSize) {
        this.st.push(x);
        this.inc.push(0);
    }
};

CustomStack.prototype.pop = function() {
    if (this.st.length === 0) return -1;
    const idx = this.st.length - 1;
    const diff = this.inc.pop();
    if (idx > 0) this.inc[idx - 1] += diff;
    return this.st.pop() + diff;
};

CustomStack.prototype.increment = function(k, val) {
    const idx = Math.min(k, this.st.length) - 1;
    if (idx >= 0) this.inc[idx] += val;
};`,
        approach: 'JavaScript Lazy Increment Stack',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class CustomStack:
    def __init__(self, maxSize: int):
        self.max_size = maxSize
        self.stack = []
        self.inc = []

    def push(self, x: int) -> None:
        if len(self.stack) < self.max_size:
            self.stack.append(x)
            self.inc.append(0)

    def pop(self) -> int:
        if not self.stack:
            return -1
        idx = len(self.stack) - 1
        diff = self.inc.pop()
        if idx > 0:
            self.inc[-1] += diff
        return self.stack.pop() + diff

    def increment(self, k: int, val: int) -> None:
        idx = min(k, len(self.stack)) - 1
        if idx >= 0:
            self.inc[idx] += val

stk = CustomStack(3)
stk.push(1)
stk.push(2)
assert stk.pop() == 2
stk.push(2)
stk.push(3)
stk.push(4)
stk.increment(5, 100)
stk.increment(2, 100)
assert stk.pop() == 103
assert stk.pop() == 202
assert stk.pop() == 201
assert stk.pop() == -1
print("All tests passed successfully.")
`
  },

  // 12. #1396 design-underground-system
  {
    slug: 'design-underground-system',
    number: 1396,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Check-In and Route Aggregation Maps',
        text: 'Store ongoing passenger journeys keyed by customer identifier, and aggregate total travel duration and trip count between station pairs.'
      },
      {
        level: 2,
        title: 'Station Pair Route Keying',
        text: 'Use composite string key (startStation, endStation) to accumulate cumulative travel time and completed trip count.'
      },
      {
        level: 3,
        title: 'Check-Out and Average Computation Blueprint',
        text: 'On checkOut, pop (startStation, t_in) from customer map, add (t_out - t_in) to route map, and increment trips. getAverageTime returns total / trips.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass UndergroundSystem:\n    def __init__(self):\n        self.check_ins = {}\n        self.routes = {}\n\n    def checkIn(self, id: int, stationName: str, t: int) -> None:\n        self.check_ins[id] = (stationName, t)\n\n    def checkOut(self, id: int, stationName: str, t: int) -> None:\n        start_station, t_in = self.check_ins.pop(id)\n        route = (start_station, stationName)\n        total_time, count = self.routes.get(route, (0, 0))\n        self.routes[route] = (total_time + (t - t_in), count + 1)\n\n    def getAverageTime(self, startStation: str, endStation: str) -> float:\n        total_time, count = self.routes[(startStation, endStation)]\n        return total_time / count\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) checkIn, O(1) checkOut, O(1) getAverageTime',
      space: 'O(P + R)',
      variables: ['P: active passengers', 'R: distinct station routes'],
      notes: 'All operations execute in constant time via hash map lookups and running sums.',
      whyNaiveFails: 'Scanning historical journey logs on each average query leads to O(T) search time per request.',
      spaceTimeTradeoff: 'Dual map architecture maintains active journeys and cumulative route totals simultaneously.',
      interviewerExpectation: 'O(1) average time query using incremental running sum and trip counter.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class UndergroundSystem:
    def __init__(self):
        self.check_ins = {}
        self.routes = {}

    def checkIn(self, id: int, stationName: str, t: int) -> None:
        self.check_ins[id] = (stationName, t)

    def checkOut(self, id: int, stationName: str, t: int) -> None:
        start_station, t_in = self.check_ins.pop(id)
        route = (start_station, stationName)
        total_time, count = self.routes.get(route, (0, 0))
        self.routes[route] = (total_time + (t - t_in), count + 1)

    def getAverageTime(self, startStation: str, endStation: str) -> float:
        total_time, count = self.routes[(startStation, endStation)]
        return total_time / count`,
        approach: 'Dual Hash Map Route Aggregator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class UndergroundSystem {
    unordered_map<int, pair<string, int>> checkIns;
    unordered_map<string, pair<double, int>> routes;
public:
    UndergroundSystem() {}
    void checkIn(int id, string stationName, int t) {
        checkIns[id] = {stationName, t};
    }
    void checkOut(int id, string stationName, int t) {
        auto [startStation, tIn] = checkIns[id];
        checkIns.erase(id);
        string key = startStation + "->" + stationName;
        routes[key].first += (t - tIn);
        routes[key].second += 1;
    }
    double getAverageTime(string startStation, string endStation) {
        string key = startStation + "->" + endStation;
        return routes[key].first / routes[key].second;
    }
};`,
        approach: 'C++ Hash Table Running Averages',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class UndergroundSystem {
    private Map<Integer, Pair<String, Integer>> checkIns = new HashMap<>();
    private Map<String, double[]> routes = new HashMap<>();

    public UndergroundSystem() {}

    public void checkIn(int id, String stationName, int t) {
        checkIns.put(id, new Pair<>(stationName, t));
    }

    public void checkOut(int id, String stationName, int t) {
        Pair<String, Integer> in = checkIns.remove(id);
        String key = in.getKey() + "->" + stationName;
        routes.computeIfAbsent(key, k -> new double[2]);
        routes.get(key)[0] += (t - in.getValue());
        routes.get(key)[1] += 1;
    }

    public double getAverageTime(String startStation, String endStation) {
        String key = startStation + "->" + endStation;
        double[] r = routes.get(key);
        return r[0] / r[1];
    }

    private static class Pair<K, V> {
        private K key;
        private V value;
        public Pair(K key, V value) { this.key = key; this.value = value; }
        public K getKey() { return key; }
        public V getValue() { return value; }
    }
}`,
        approach: 'Java Route String Key Map',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var UndergroundSystem = function() {
    this.checkIns = new Map();
    this.routes = new Map();
};

UndergroundSystem.prototype.checkIn = function(id, stationName, t) {
    this.checkIns.set(id, [stationName, t]);
};

UndergroundSystem.prototype.checkOut = function(id, stationName, t) {
    const [startStation, tIn] = this.checkIns.get(id);
    this.checkIns.delete(id);
    const key = \`\${startStation}->\${stationName}\`;
    if (!this.routes.has(key)) this.routes.set(key, [0, 0]);
    const r = this.routes.get(key);
    r[0] += (t - tIn);
    r[1] += 1;
};

UndergroundSystem.prototype.getAverageTime = function(startStation, endStation) {
    const key = \`\${startStation}->\${endStation}\`;
    const [total, count] = this.routes.get(key);
    return total / count;
};`,
        approach: 'JavaScript Route Aggregation Map',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class UndergroundSystem:
    def __init__(self):
        self.check_ins = {}
        self.routes = {}

    def checkIn(self, id: int, stationName: str, t: int) -> None:
        self.check_ins[id] = (stationName, t)

    def checkOut(self, id: int, stationName: str, t: int) -> None:
        start_station, t_in = self.check_ins.pop(id)
        route = (start_station, stationName)
        total_time, count = self.routes.get(route, (0, 0))
        self.routes[route] = (total_time + (t - t_in), count + 1)

    def getAverageTime(self, startStation: str, endStation: str) -> float:
        total_time, count = self.routes[(startStation, endStation)]
        return total_time / count

sys = UndergroundSystem()
sys.checkIn(45, "Leyton", 3)
sys.checkIn(32, "Paradise", 8)
sys.checkIn(27, "Leyton", 10)
sys.checkOut(45, "Waterloo", 15)
sys.checkOut(27, "Waterloo", 20)
sys.checkOut(32, "Cambridge", 22)
assert abs(sys.getAverageTime("Paradise", "Cambridge") - 14.0) < 1e-5
assert abs(sys.getAverageTime("Leyton", "Waterloo") - 11.0) < 1e-5
print("All tests passed successfully.")
`
  },

  // 13. #1397 find-all-good-strings
  {
    slug: 'find-all-good-strings',
    number: 1397,
    category: 'Algorithms',
    patterns: ['string-matching'],
    hints: [
      {
        level: 1,
        title: 'Digit DP on Strings with Evil Pattern Automaton',
        text: 'Count strings of length n lexicographically bounded by s1 and s2 that do not contain evil as a substring.'
      },
      {
        level: 2,
        title: 'KMP Failure Function for Evil Matching',
        text: 'Build prefix function for evil. As digits are placed, advance through the prefix automaton. A transition reaching len(evil) is invalid.'
      },
      {
        level: 3,
        title: 'Digit DP State Memoization Blueprint',
        text: 'State is (idx, evil_match_idx, is_less_s1, is_greater_s2). Iterate allowed characters bounded by s1[idx] and s2[idx].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def findGoodStrings(self, n: int, s1: str, s2: str, evil: str) -> int:\n        MOD = 10**9 + 7\n        m = len(evil)\n        kmp = [0] * m\n        j = 0\n        for i in range(1, m):\n            while j > 0 and evil[i] != evil[j]:\n                j = kmp[j - 1]\n            if evil[i] == evil[j]:\n                j += 1\n            kmp[i] = j\n\n        def get_next(match, ch):\n            while match > 0 and evil[match] != ch:\n                match = kmp[match - 1]\n            if evil[match] == ch:\n                match += 1\n            return match\n\n        memo = {}\n\n        def dp(i, match, is_lo, is_hi):\n            if match == m:\n                return 0\n            if i == n:\n                return 1\n            state = (i, match, is_lo, is_hi)\n            if state in memo:\n                return memo[state]\n\n            c_min = s1[i] if is_lo else "a"\n            c_max = s2[i] if is_hi else "z"\n            ans = 0\n            for c in range(ord(c_min), ord(c_max) + 1):\n                ch = chr(c)\n                nxt_match = get_next(match, ch)\n                nxt_lo = is_lo and (ch == c_min)\n                nxt_hi = is_hi and (ch == c_max)\n                ans = (ans + dp(i + 1, nxt_match, nxt_lo, nxt_hi)) % MOD\n\n            memo[state] = ans\n            return ans\n\n        return dp(0, 0, True, True)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N * M * 26)',
      space: 'O(N * M)',
      variables: ['N: string length', 'M: evil string length'],
      notes: 'State space is bounded by N positions times M evil automaton states times 4 boolean limit flags.',
      whyNaiveFails: 'Generating all 26^N candidate strings and executing substring searches causes exponential blowup.',
      spaceTimeTradeoff: 'KMP state transitions enable instant O(1) state descent without backtracking string history.',
      interviewerExpectation: 'Digit dynamic programming integrated with KMP pattern matching automaton.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def findGoodStrings(self, n: int, s1: str, s2: str, evil: str) -> int:
        MOD = 10**9 + 7
        m = len(evil)
        kmp = [0] * m
        j = 0
        for i in range(1, m):
            while j > 0 and evil[i] != evil[j]:
                j = kmp[j - 1]
            if evil[i] == evil[j]:
                j += 1
            kmp[i] = j

        def get_next(match, ch):
            while match > 0 and evil[match] != ch:
                match = kmp[match - 1]
            if evil[match] == ch:
                match += 1
            return match

        memo = {}

        def dp(i, match, is_lo, is_hi):
            if match == m:
                return 0
            if i == n:
                return 1
            state = (i, match, is_lo, is_hi)
            if state in memo:
                return memo[state]

            c_min = s1[i] if is_lo else "a"
            c_max = s2[i] if is_hi else "z"
            ans = 0
            for c in range(ord(c_min), ord(c_max) + 1):
                ch = chr(c)
                nxt_match = get_next(match, ch)
                nxt_lo = is_lo and (ch == c_min)
                nxt_hi = is_hi and (ch == c_max)
                ans = (ans + dp(i + 1, nxt_match, nxt_lo, nxt_hi)) % MOD

            memo[state] = ans
            return ans

        return dp(0, 0, True, True)`,
        approach: 'Digit DP with KMP Evil State Automaton',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    int memo[501][51][2][2];
    int MOD = 1e9 + 7;
    int kmp[51];
    string S1, S2, E;
    int N, M;

    int getNext(int match, char ch) {
        while (match > 0 && E[match] != ch) match = kmp[match - 1];
        if (E[match] == ch) match++;
        return match;
    }

    int dp(int i, int match, bool isLo, bool isHi) {
        if (match == M) return 0;
        if (i == N) return 1;
        if (memo[i][match][isLo][isHi] != -1) return memo[i][match][isLo][isHi];

        char cMin = isLo ? S1[i] : 'a';
        char cMax = isHi ? S2[i] : 'z';
        long long ans = 0;
        for (char ch = cMin; ch <= cMax; ch++) {
            int nxtMatch = getNext(match, ch);
            bool nxtLo = isLo && (ch == cMin);
            bool nxtHi = isHi && (ch == cMax);
            ans = (ans + dp(i + 1, nxtMatch, nxtLo, nxtHi)) % MOD;
        }
        return memo[i][match][isLo][isHi] = ans;
    }
public:
    int findGoodStrings(int n, string s1, string s2, string evil) {
        N = n; S1 = s1; S2 = s2; E = evil; M = evil.size();
        kmp[0] = 0;
        int j = 0;
        for (int i = 1; i < M; i++) {
            while (j > 0 && E[i] != E[j]) j = kmp[j - 1];
            if (E[i] == E[j]) j++;
            kmp[i] = j;
        }
        memset(memo, -1, sizeof(memo));
        return dp(0, 0, true, true);
    }
};`,
        approach: 'C++ Digit DP with KMP Transitions',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private int[][][][] memo;
    private int MOD = 1_000_000_007;
    private int[] kmp;
    private String S1, S2, E;
    private int N, M;

    private int getNext(int match, char ch) {
        while (match > 0 && E.charAt(match) != ch) match = kmp[match - 1];
        if (E.charAt(match) == ch) match++;
        return match;
    }

    private int dp(int i, int match, int isLo, int isHi) {
        if (match == M) return 0;
        if (i == N) return 1;
        if (memo[i][match][isLo][isHi] != -1) return memo[i][match][isLo][isHi];

        char cMin = isLo == 1 ? S1.charAt(i) : 'a';
        char cMax = isHi == 1 ? S2.charAt(i) : 'z';
        long ans = 0;
        for (char ch = cMin; ch <= cMax; ch++) {
            int nxtMatch = getNext(match, ch);
            int nxtLo = (isLo == 1 && ch == cMin) ? 1 : 0;
            int nxtHi = (isHi == 1 && ch == cMax) ? 1 : 0;
            ans = (ans + dp(i + 1, nxtMatch, nxtLo, nxtHi)) % MOD;
        }
        return memo[i][match][isLo][isHi] = (int) ans;
    }

    public int findGoodStrings(int n, String s1, String s2, String evil) {
        N = n; S1 = s1; S2 = s2; E = evil; M = evil.length();
        kmp = new int[M];
        int j = 0;
        for (int i = 1; i < M; i++) {
            while (j > 0 && E.charAt(i) != E.charAt(j)) j = kmp[j - 1];
            if (E.charAt(i) == E.charAt(j)) j++;
            kmp[i] = j;
        }
        memo = new int[n + 1][M + 1][2][2];
        for (int[][][] a : memo)
            for (int[][] b : a)
                for (int[] c : b)
                    Arrays.fill(c, -1);
        return dp(0, 0, 1, 1);
    }
}`,
        approach: 'Java DP Automaton State Memoization',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var findGoodStrings = function(n, s1, s2, evil) {
    const MOD = 1000000007;
    const m = evil.length;
    const kmp = Array(m).fill(0);
    let j = 0;
    for (let i = 1; i < m; i++) {
        while (j > 0 && evil[i] !== evil[j]) j = kmp[j - 1];
        if (evil[i] === evil[j]) j++;
        kmp[i] = j;
    }
    function getNext(match, ch) {
        while (match > 0 && evil[match] !== ch) match = kmp[match - 1];
        if (evil[match] === ch) match++;
        return match;
    }
    const memo = new Map();
    function dp(i, match, isLo, isHi) {
        if (match === m) return 0;
        if (i === n) return 1;
        const key = \`\${i},\${match},\${isLo ? 1 : 0},\${isHi ? 1 : 0}\`;
        if (memo.has(key)) return memo.get(key);
        const cMin = isLo ? s1.charCodeAt(i) : 97;
        const cMax = isHi ? s2.charCodeAt(i) : 122;
        let ans = 0;
        for (let c = cMin; c <= cMax; c++) {
            const ch = String.fromCharCode(c);
            const nxtMatch = getNext(match, ch);
            const nxtLo = isLo && (c === cMin);
            const nxtHi = isHi && (c === cMax);
            ans = (ans + dp(i + 1, nxtMatch, nxtLo, nxtHi)) % MOD;
        }
        memo.set(key, ans);
        return ans;
    }
    return dp(0, 0, true, true);
};`,
        approach: 'JavaScript Digit DP with KMP Match',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Solution:
    def findGoodStrings(self, n: int, s1: str, s2: str, evil: str) -> int:
        MOD = 10**9 + 7
        m = len(evil)
        kmp = [0] * m
        j = 0
        for i in range(1, m):
            while j > 0 and evil[i] != evil[j]:
                j = kmp[j - 1]
            if evil[i] == evil[j]:
                j += 1
            kmp[i] = j

        def get_next(match, ch):
            while match > 0 and evil[match] != ch:
                match = kmp[match - 1]
            if evil[match] == ch:
                match += 1
            return match

        memo = {}

        def dp(i, match, is_lo, is_hi):
            if match == m:
                return 0
            if i == n:
                return 1
            state = (i, match, is_lo, is_hi)
            if state in memo:
                return memo[state]

            c_min = s1[i] if is_lo else "a"
            c_max = s2[i] if is_hi else "z"
            ans = 0
            for c in range(ord(c_min), ord(c_max) + 1):
                ch = chr(c)
                nxt_match = get_next(match, ch)
                nxt_lo = is_lo and (ch == c_min)
                nxt_hi = is_hi and (ch == c_max)
                ans = (ans + dp(i + 1, nxt_match, nxt_lo, nxt_hi)) % MOD

            memo[state] = ans
            return ans

        return dp(0, 0, True, True)

sol = Solution()
assert sol.findGoodStrings(2, "aa", "da", "b") == 51
assert sol.findGoodStrings(8, "leetcode", "leetgoes", "leet") == 0
assert sol.findGoodStrings(2, "gx", "gz", "x") == 2
print("All tests passed successfully.")
`
  },

  // 14. #1418 display-table-of-food-orders-in-a-restaurant
  {
    slug: 'display-table-of-food-orders-in-a-restaurant',
    number: 1418,
    category: 'Algorithms',
    patterns: ['hash-map-lookup'],
    hints: [
      {
        level: 1,
        title: 'Two-Dimensional Frequency Pivot Table',
        text: 'Group food order quantities by table number and food item name into a two-dimensional count matrix.'
      },
      {
        level: 2,
        title: 'Sorted Row and Column Header Ordering',
        text: 'Sort table numbers numerically as row keys, and sort distinct food items alphabetically as header columns.'
      },
      {
        level: 3,
        title: 'Output Matrix Formatting Blueprint',
        text: 'Format header row as Table followed by sorted food names. For each sorted table number, emit table string followed by string count for each food item.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import defaultdict\n\nclass Solution:\n    def displayTable(self, orders: list[list[str]]) -> list[list[str]]:\n        foods = set()\n        tables = defaultdict(lambda: defaultdict(int))\n\n        for _, tbl, food in orders:\n            foods.add(food)\n            tables[int(tbl)][food] += 1\n\n        sorted_foods = sorted(foods)\n        res = [["Table"] + sorted_foods]\n\n        for tbl in sorted(tables.keys()):\n            row = [str(tbl)]\n            for f in sorted_foods:\n                row.append(str(tables[tbl][f]))\n            res.append(row)\n        return res\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N + T * log T + F * log F + T * F)',
      space: 'O(N + T * F)',
      variables: ['N: number of orders', 'T: number of distinct tables', 'F: number of distinct food items'],
      notes: 'Constructs the pivot matrix in time proportional to total orders plus output dimensions.',
      whyNaiveFails: 'Re-filtering the raw order list for every (table, food) cell creates an O(N * T * F) cubic workload.',
      spaceTimeTradeoff: 'Nested dictionary grouping caches frequencies for direct O(1) table row emission.',
      interviewerExpectation: 'Correct numerical sorting of table rows and alphabetical sorting of food columns.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import defaultdict

class Solution:
    def displayTable(self, orders: list[list[str]]) -> list[list[str]]:
        foods = set()
        tables = defaultdict(lambda: defaultdict(int))

        for _, tbl, food in orders:
            foods.add(food)
            tables[int(tbl)][food] += 1

        sorted_foods = sorted(foods)
        res = [["Table"] + sorted_foods]

        for tbl in sorted(tables.keys()):
            row = [str(tbl)]
            for f in sorted_foods:
                row.append(str(tables[tbl][f]))
            res.append(row)
        return res`,
        approach: 'Nested Hash Map Pivot Matrix',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    vector<vector<string>> displayTable(vector<vector<string>>& orders) {
        set<string> foods;
        map<int, unordered_map<string, int>> tables;
        for (auto& o : orders) {
            int tbl = stoi(o[1]);
            string food = o[2];
            foods.insert(food);
            tables[tbl][food]++;
        }
        vector<string> sortedFoods(foods.begin(), foods.end());
        vector<vector<string>> res;
        vector<string> header = {"Table"};
        header.insert(header.end(), sortedFoods.begin(), sortedFoods.end());
        res.push_back(header);
        for (auto& [tbl, fmap] : tables) {
            vector<string> row = {to_string(tbl)};
            for (auto& f : sortedFoods) {
                row.push_back(to_string(fmap.count(f) ? fmap[f] : 0));
            }
            res.push_back(row);
        }
        return res;
    }
};`,
        approach: 'C++ Map and Set Pivot Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public List<List<String>> displayTable(List<List<String>> orders) {
        TreeSet<String> foods = new TreeSet<>();
        TreeMap<Integer, Map<String, Integer>> tables = new TreeMap<>();
        for (List<String> o : orders) {
            int tbl = Integer.parseInt(o.get(1));
            String food = o.get(2);
            foods.add(food);
            tables.computeIfAbsent(tbl, k -> new HashMap<>());
            tables.get(tbl).put(food, tables.get(tbl).getOrDefault(food, 0) + 1);
        }
        List<List<String>> res = new ArrayList<>();
        List<String> header = new ArrayList<>();
        header.add("Table");
        header.addAll(foods);
        res.add(header);
        for (Map.Entry<Integer, Map<String, Integer>> entry : tables.entrySet()) {
            List<String> row = new ArrayList<>();
            row.add(String.valueOf(entry.getKey()));
            Map<String, Integer> map = entry.getValue();
            for (String f : foods) {
                row.add(String.valueOf(map.getOrDefault(f, 0)));
            }
            res.add(row);
        }
        return res;
    }
}`,
        approach: 'Java TreeMap and TreeSet Food Table',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var displayTable = function(orders) {
    const foods = new Set();
    const tables = new Map();
    for (const [_, tblStr, food] of orders) {
        const tbl = parseInt(tblStr, 10);
        foods.add(food);
        if (!tables.has(tbl)) tables.set(tbl, new Map());
        const fmap = tables.get(tbl);
        fmap.set(food, (fmap.get(food) || 0) + 1);
    }
    const sortedFoods = Array.from(foods).sort();
    const sortedTables = Array.from(tables.keys()).sort((a, b) => a - b);
    const res = [['Table', ...sortedFoods]];
    for (const tbl of sortedTables) {
        const fmap = tables.get(tbl);
        const row = [String(tbl)];
        for (const f of sortedFoods) {
            row.push(String(fmap.get(f) || 0));
        }
        res.push(row);
    }
    return res;
};`,
        approach: 'JavaScript Map Pivot Formatter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `from collections import defaultdict

class Solution:
    def displayTable(self, orders: list[list[str]]) -> list[list[str]]:
        foods = set()
        tables = defaultdict(lambda: defaultdict(int))

        for _, tbl, food in orders:
            foods.add(food)
            tables[int(tbl)][food] += 1

        sorted_foods = sorted(foods)
        res = [["Table"] + sorted_foods]

        for tbl in sorted(tables.keys()):
            row = [str(tbl)]
            for f in sorted_foods:
                row.append(str(tables[tbl][f]))
            res.append(row)
        return res

sol = Solution()
orders = [["David","3","Ceviche"],["Corina","10","Beef Burrito"],["David","3","Fried Chicken"],["Carla","5","Water"],["Carla","5","Ceviche"],["Rous","3","Ceviche"]]
ans = sol.displayTable(orders)
assert ans[0] == ["Table","Beef Burrito","Ceviche","Fried Chicken","Water"]
assert ans[1] == ["3","0","2","1","0"]
assert ans[2] == ["5","0","1","0","1"]
assert ans[3] == ["10","1","0","0","0"]
print("All tests passed successfully.")
`
  },

  // 15. #1419 minimum-number-of-frogs-croaking
  {
    slug: 'minimum-number-of-frogs-croaking',
    number: 1419,
    category: 'Algorithms',
    patterns: ['hash-map-lookup'],
    hints: [
      {
        level: 1,
        title: 'State Transition Phase Tracking',
        text: 'A frog singing croak transitions through states c -> r -> o -> a -> k sequentially.'
      },
      {
        level: 2,
        title: 'Letter Precedence Invariance Check',
        text: 'Each incoming letter requires an existing frog in the preceding phase. If no frog is in that state, the sequence is invalid.'
      },
      {
        level: 3,
        title: 'Concurrent Frogs Peak Blueprint',
        text: 'When c arrives, start a new frog or recycle a finished frog, and track peak active frogs. When k arrives, the frog finishes and is available for reuse.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def minNumberOfFrogs(self, croakOfFrogs: str) -> int:\n        c = r = o = a = 0\n        frogs = 0\n        max_frogs = 0\n        for ch in croakOfFrogs:\n            if ch == "c":\n                c += 1\n                frogs += 1\n                max_frogs = max(max_frogs, frogs)\n            elif ch == "r":\n                if c == 0: return -1\n                c -= 1\n                r += 1\n            elif ch == "o":\n                if r == 0: return -1\n                r -= 1\n                o += 1\n            elif ch == "a":\n                if o == 0: return -1\n                o -= 1\n                a += 1\n            elif ch == "k":\n                if a == 0: return -1\n                a -= 1\n                frogs -= 1\n            else:\n                return -1\n        return max_frogs if frogs == 0 and c == r == o == a == 0 else -1\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: string length'],
      notes: 'Single pass tracking 5 integer phase counters in constant space.',
      whyNaiveFails: 'Greedy substring search without concurrent phase simulation fails on interleaved croak sounds.',
      spaceTimeTradeoff: 'Direct finite state counts eliminate allocating dynamic objects for individual frogs.',
      interviewerExpectation: 'Precedence validation and peak concurrent active frog tracking.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def minNumberOfFrogs(self, croakOfFrogs: str) -> int:
        c = r = o = a = 0
        frogs = 0
        max_frogs = 0
        for ch in croakOfFrogs:
            if ch == "c":
                c += 1
                frogs += 1
                max_frogs = max(max_frogs, frogs)
            elif ch == "r":
                if c == 0: return -1
                c -= 1
                r += 1
            elif ch == "o":
                if r == 0: return -1
                r -= 1
                o += 1
            elif ch == "a":
                if o == 0: return -1
                o -= 1
                a += 1
            elif ch == "k":
                if a == 0: return -1
                a -= 1
                frogs -= 1
            else:
                return -1
        return max_frogs if frogs == 0 and c == r == o == a == 0 else -1`,
        approach: 'Finite State Machine with Peak Concurrency Counter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int minNumberOfFrogs(string croakOfFrogs) {
        int c = 0, r = 0, o = 0, a = 0, frogs = 0, maxFrogs = 0;
        for (char ch : croakOfFrogs) {
            if (ch == 'c') {
                c++; frogs++;
                maxFrogs = max(maxFrogs, frogs);
            } else if (ch == 'r') {
                if (c == 0) return -1;
                c--; r++;
            } else if (ch == 'o') {
                if (r == 0) return -1;
                r--; o++;
            } else if (ch == 'a') {
                if (o == 0) return -1;
                o--; a++;
            } else if (ch == 'k') {
                if (a == 0) return -1;
                a--; frogs--;
            } else {
                return -1;
            }
        }
        return (frogs == 0 && c == 0 && r == 0 && o == 0 && a == 0) ? maxFrogs : -1;
    }
};`,
        approach: 'C++ State Counter State Machine',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int minNumberOfFrogs(String croakOfFrogs) {
        int c = 0, r = 0, o = 0, a = 0, frogs = 0, maxFrogs = 0;
        for (int i = 0; i < croakOfFrogs.length(); i++) {
            char ch = croakOfFrogs.charAt(i);
            if (ch == 'c') {
                c++; frogs++;
                maxFrogs = Math.max(maxFrogs, frogs);
            } else if (ch == 'r') {
                if (c == 0) return -1;
                c--; r++;
            } else if (ch == 'o') {
                if (r == 0) return -1;
                r--; o++;
            } else if (ch == 'a') {
                if (o == 0) return -1;
                o--; a++;
            } else if (ch == 'k') {
                if (a == 0) return -1;
                a--; frogs--;
            } else {
                return -1;
            }
        }
        return (frogs == 0 && c == 0 && r == 0 && o == 0 && a == 0) ? maxFrogs : -1;
    }
}`,
        approach: 'Java Character Phase Simulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var minNumberOfFrogs = function(croakOfFrogs) {
    let c = 0, r = 0, o = 0, a = 0, frogs = 0, maxFrogs = 0;
    for (const ch of croakOfFrogs) {
        if (ch === 'c') {
            c++; frogs++;
            maxFrogs = Math.max(maxFrogs, frogs);
        } else if (ch === 'r') {
            if (c === 0) return -1;
            c--; r++;
        } else if (ch === 'o') {
            if (r === 0) return -1;
            r--; o++;
        } else if (ch === 'a') {
            if (o === 0) return -1;
            o--; a++;
        } else if (ch === 'k') {
            if (a === 0) return -1;
            a--; frogs--;
        } else {
            return -1;
        }
    }
    return (frogs === 0 && c === 0 && r === 0 && o === 0 && a === 0) ? maxFrogs : -1;
};`,
        approach: 'JavaScript State Transition Counter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Solution:
    def minNumberOfFrogs(self, croakOfFrogs: str) -> int:
        c = r = o = a = 0
        frogs = 0
        max_frogs = 0
        for ch in croakOfFrogs:
            if ch == "c":
                c += 1
                frogs += 1
                max_frogs = max(max_frogs, frogs)
            elif ch == "r":
                if c == 0: return -1
                c -= 1
                r += 1
            elif ch == "o":
                if r == 0: return -1
                r -= 1
                o += 1
            elif ch == "a":
                if o == 0: return -1
                o -= 1
                a += 1
            elif ch == "k":
                if a == 0: return -1
                a -= 1
                frogs -= 1
            else:
                return -1
        return max_frogs if frogs == 0 and c == r == o == a == 0 else -1

sol = Solution()
assert sol.minNumberOfFrogs("croakcroak") == 1
assert sol.minNumberOfFrogs("crcoakroak") == 2
assert sol.minNumberOfFrogs("croakcrook") == -1
print("All tests passed successfully.")
`
  },

  // 16. #1420 build-array-where-you-can-find-the-maximum-exactly-k-comparisons
  {
    slug: 'build-array-where-you-can-find-the-maximum-exactly-k-comparisons',
    number: 1420,
    category: 'Algorithms',
    patterns: ['dp-grid-2d'],
    hints: [
      {
        level: 1,
        title: 'Prefix Maximum State Formulation',
        text: 'The search cost increments only when choosing a number strictly greater than all previous numbers in the prefix.'
      },
      {
        level: 2,
        title: 'Three-Dimensional Dynamic Programming',
        text: 'Define dp[i][j][c] as the number of valid arrays of length i having prefix maximum j and search cost c.'
      },
      {
        level: 3,
        title: 'Prefix Sum Transition Optimization',
        text: 'Either pick a number <= j (j choices, cost unchanged), or pick a number v > j (1 choice per v, cost increments). Accumulate transitions modulo 10^9 + 7.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def numOfArrays(self, n: int, m: int, k: int) -> int:\n        if k == 0 or k > m:\n            return 0\n        MOD = 10**9 + 7\n        dp = [[0] * (m + 1) for _ in range(k + 1)]\n        for j in range(1, m + 1):\n            dp[1][j] = 1\n\n        for _ in range(2, n + 1):\n            new_dp = [[0] * (m + 1) for _ in range(k + 1)]\n            for c in range(1, k + 1):\n                pref = 0\n                for j in range(1, m + 1):\n                    new_dp[c][j] = (dp[c][j] * j + pref) % MOD\n                    pref = (pref + dp[c - 1][j]) % MOD\n            dp = new_dp\n\n        return sum(dp[k][j] for j in range(1, m + 1)) % MOD\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N * M * K)',
      space: 'O(M * K)',
      variables: ['N: array length', 'M: max element value', 'K: search cost'],
      notes: 'Prefix sum accumulation optimizes inner transition from O(M^2) to O(M).',
      whyNaiveFails: 'Generating M^N arrays takes astronomical time even for modest values of N=50.',
      spaceTimeTradeoff: 'Rolling 2D table reduces memory footprint to O(M * K).',
      interviewerExpectation: 'Prefix-sum optimized 3D dynamic programming with rolling space optimization.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def numOfArrays(self, n: int, m: int, k: int) -> int:
        if k == 0 or k > m:
            return 0
        MOD = 10**9 + 7
        dp = [[0] * (m + 1) for _ in range(k + 1)]
        for j in range(1, m + 1):
            dp[1][j] = 1

        for _ in range(2, n + 1):
            new_dp = [[0] * (m + 1) for _ in range(k + 1)]
            for c in range(1, k + 1):
                pref = 0
                for j in range(1, m + 1):
                    new_dp[c][j] = (dp[c][j] * j + pref) % MOD
                    pref = (pref + dp[c - 1][j]) % MOD
            dp = new_dp

        return sum(dp[k][j] for j in range(1, m + 1)) % MOD`,
        approach: 'Prefix-Sum Optimized 3D DP with Rolling Layers',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int numOfArrays(int n, int m, int k) {
        if (k == 0 || k > m) return 0;
        int MOD = 1e9 + 7;
        vector<vector<long long>> dp(k + 1, vector<long long>(m + 1, 0));
        for (int j = 1; j <= m; j++) dp[1][j] = 1;

        for (int step = 2; step <= n; step++) {
            vector<vector<long long>> newDp(k + 1, vector<long long>(m + 1, 0));
            for (int c = 1; c <= k; c++) {
                long long pref = 0;
                for (int j = 1; j <= m; j++) {
                    newDp[c][j] = (dp[c][j] * j + pref) % MOD;
                    pref = (pref + dp[c - 1][j]) % MOD;
                }
            }
            dp = move(newDp);
        }
        long long ans = 0;
        for (int j = 1; j <= m; j++) ans = (ans + dp[k][j]) % MOD;
        return ans;
    }
};`,
        approach: 'C++ Rolling Prefix DP Layers',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int numOfArrays(int n, int m, int k) {
        if (k == 0 || k > m) return 0;
        int MOD = 1_000_000_007;
        long[][] dp = new long[k + 1][m + 1];
        for (int j = 1; j <= m; j++) dp[1][j] = 1;

        for (int step = 2; step <= n; step++) {
            long[][] newDp = new long[k + 1][m + 1];
            for (int c = 1; c <= k; c++) {
                long pref = 0;
                for (int j = 1; j <= m; j++) {
                    newDp[c][j] = (dp[c][j] * j + pref) % MOD;
                    pref = (pref + dp[c - 1][j]) % MOD;
                }
            }
            dp = newDp;
        }
        long ans = 0;
        for (int j = 1; j <= m; j++) ans = (ans + dp[k][j]) % MOD;
        return (int) ans;
    }
}`,
        approach: 'Java 2D Layer DP with Running Prefix Sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var numOfArrays = function(n, m, k) {
    if (k === 0 || k > m) return 0;
    const MOD = 1000000007;
    let dp = Array.from({ length: k + 1 }, () => Array(m + 1).fill(0));
    for (let j = 1; j <= m; j++) dp[1][j] = 1;

    for (let step = 2; step <= n; step++) {
        const newDp = Array.from({ length: k + 1 }, () => Array(m + 1).fill(0));
        for (let c = 1; c <= k; c++) {
            let pref = 0;
            for (let j = 1; j <= m; j++) {
                newDp[c][j] = (dp[c][j] * j + pref) % MOD;
                pref = (pref + dp[c - 1][j]) % MOD;
            }
        }
        dp = newDp;
    }
    let ans = 0;
    for (let j = 1; j <= m; j++) ans = (ans + dp[k][j]) % MOD;
    return ans;
};`,
        approach: 'JavaScript Rolling 2D DP Array',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Solution:
    def numOfArrays(self, n: int, m: int, k: int) -> int:
        if k == 0 or k > m:
            return 0
        MOD = 10**9 + 7
        dp = [[0] * (m + 1) for _ in range(k + 1)]
        for j in range(1, m + 1):
            dp[1][j] = 1

        for _ in range(2, n + 1):
            new_dp = [[0] * (m + 1) for _ in range(k + 1)]
            for c in range(1, k + 1):
                pref = 0
                for j in range(1, m + 1):
                    new_dp[c][j] = (dp[c][j] * j + pref) % MOD
                    pref = (pref + dp[c - 1][j]) % MOD
            dp = new_dp

        return sum(dp[k][j] for j in range(1, m + 1)) % MOD

sol = Solution()
assert sol.numOfArrays(2, 3, 1) == 6
assert sol.numOfArrays(5, 2, 3) == 0
assert sol.numOfArrays(9, 1, 1) == 1
print("All tests passed successfully.")
`
  }
];
