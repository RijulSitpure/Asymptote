import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Problem definitions for Batch 20 Algorithms (22 problems: #1506 - #1628)
export const batch20Algo = [
  // 1. #1506 find-root-of-n-ary-tree
  {
    slug: 'find-root-of-n-ary-tree',
    number: 1506,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Parent-Child Degree Difference',
        text: 'Every node in a tree except the root appears exactly once as a child of another node.'
      },
      {
        level: 2,
        title: 'Value Summation or Parity Invariant',
        text: 'The sum of all node values minus the sum of all children values equals the root value.'
      },
      {
        level: 3,
        title: 'Matching Node Retrieval',
        text: 'Iterate through the node list and return the node whose value matches the net difference.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def findRoot(self, tree: list[\'Node\']) -> \'Node\':\n        net = 0\n        for node in tree:\n            net += node.val\n            for child in node.children:\n                net -= child.val\n        for node in tree:\n            if node.val == net:\n                return node\n        return None\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of nodes in tree'],
      notes: 'Iterates through all nodes and edges twice, requiring O(1) auxiliary space beyond the inputs.',
      whyNaiveFails: 'Storing parent sets uses O(N) extra memory when arithmetic difference identifies the root directly.',
      spaceTimeTradeoff: 'Summing values avoids hash set allocation while maintaining linear time.',
      interviewerExpectation: 'O(1) extra space arithmetic tracking of in-degree sums across tree nodes.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def findRoot(self, tree: list['Node']) -> 'Node':
        net = 0
        for node in tree:
            net += node.val
            for child in node.children:
                net -= child.val
        for node in tree:
            if node.val == net:
                return node
        return None`,
        approach: 'Arithmetic Sum Difference',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    Node* findRoot(vector<Node*> tree) {
        long long net = 0;
        for (Node* node : tree) {
            net += node->val;
            for (Node* child : node->children) {
                net -= child->val;
            }
        }
        for (Node* node : tree) {
            if (node->val == net) return node;
        }
        return nullptr;
    }
};`,
        approach: 'C++ Summation In-Degree Tracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public Node findRoot(List<Node> tree) {
        long net = 0;
        for (Node node : tree) {
            net += node.val;
            for (Node child : node.children) {
                net -= child.val;
            }
        }
        for (Node node : tree) {
            if (node.val == net) return node;
        }
        return null;
    }
}`,
        approach: 'Java Net Value Accumulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var findRoot = function(tree) {
    let net = 0;
    for (const node of tree) {
        net += node.val;
        for (const child of node.children) {
            net -= child.val;
        }
    }
    for (const node of tree) {
        if (node.val === net) return node;
    }
    return null;
};`,
        approach: 'JavaScript Sum Difference Linear Scan',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Node:
    def __init__(self, val=0, children=None):
        self.val = val
        self.children = children if children is not None else []

class Solution:
    def findRoot(self, tree: list[Node]) -> Node:
        net = 0
        for node in tree:
            net += node.val
            for child in node.children:
                net -= child.val
        for node in tree:
            if node.val == net: return node
        return None

sol = Solution()
n1 = Node(1)
n2 = Node(2)
n3 = Node(3)
n4 = Node(4)
n1.children = [n2, n3, n4]
assert sol.findRoot([n2, n4, n1, n3]) == n1
print("All tests passed successfully.")
`
  },

  // 2. #1515 best-position-for-a-service-centre
  {
    slug: 'best-position-for-a-service-centre',
    number: 1515,
    category: 'Algorithms',
    patterns: ['math-number-theory'],
    hints: [
      {
        level: 1,
        title: 'Convex Cost Landscape',
        text: 'The sum of Euclidean distances to a collection of points forms a strictly convex function in 2D space.'
      },
      {
        level: 2,
        title: 'Center of Mass Initialization',
        text: 'Initialize search at the centroid (average x, average y) of all customer locations.'
      },
      {
        level: 3,
        title: 'Step Halving Optimization',
        text: 'Sample four cardinal directions at step distance delta. If a step reduces distance, move there; otherwise halve delta until precision reaches 1e-7.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport math\n\nclass Solution:\n    def getMinDistSum(self, positions: list[list[int]]) -> float:\n        def dist_sum(x, y):\n            return sum(math.hypot(x - px, y - py) for px, py in positions)\n        x = sum(p[0] for p in positions) / len(positions)\n        y = sum(p[1] for p in positions) / len(positions)\n        step = 50.0\n        eps = 1e-7\n        while step > eps:\n            improved = False\n            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n                nx, ny = x + dx * step, y + dy * step\n                if dist_sum(nx, ny) < dist_sum(x, y):\n                    x, y = nx, ny\n                    improved = True\n                    break\n            if not improved:\n                step /= 2.0\n        return dist_sum(x, y)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N * log(1 / EPS))',
      space: 'O(1)',
      variables: ['N: number of positions', 'EPS: target precision threshold'],
      notes: 'Geometric step halving converges exponentially to the global minimum of the convex distance objective.',
      whyNaiveFails: 'Analytical solutions (Fermat-Weber point) have no closed algebraic form and require numerical convergence.',
      spaceTimeTradeoff: 'Iterative step halving requires only two coordinate variables, executing in constant auxiliary space.',
      interviewerExpectation: 'Convex optimization via gradient descent, Weiszfeld algorithm, or ternary/step-halving search.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import math

class Solution:
    def getMinDistSum(self, positions: list[list[int]]) -> float:
        def dist_sum(x, y):
            return sum(math.hypot(x - px, y - py) for px, py in positions)
        x = sum(p[0] for p in positions) / len(positions)
        y = sum(p[1] for p in positions) / len(positions)
        step = 50.0
        eps = 1e-7
        while step > eps:
            improved = False
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx * step, y + dy * step
                if dist_sum(nx, ny) < dist_sum(x, y):
                    x, y = nx, ny
                    improved = True
                    break
            if not improved:
                step /= 2.0
        return dist_sum(x, y)`,
        approach: 'Step Halving Convex Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    double distSum(double x, double y, const vector<vector<int>>& positions) {
        double d = 0;
        for (const auto& p : positions) {
            d += hypot(x - p[0], y - p[1]);
        }
        return d;
    }
public:
    double getMinDistSum(vector<vector<int>>& positions) {
        double x = 0, y = 0;
        for (const auto& p : positions) {
            x += p[0];
            y += p[1];
        }
        x /= positions.size();
        y /= positions.size();
        double step = 50.0;
        double eps = 1e-7;
        const int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        while (step > eps) {
            bool improved = false;
            double curD = distSum(x, y, positions);
            for (int i = 0; i < 4; i++) {
                double nx = x + dirs[i][0] * step;
                double ny = y + dirs[i][1] * step;
                if (distSum(nx, ny, positions) < curD) {
                    x = nx;
                    y = ny;
                    improved = true;
                    break;
                }
            }
            if (!improved) step /= 2.0;
        }
        return distSum(x, y, positions);
    }
};`,
        approach: 'C++ Step Halving Descent',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private double distSum(double x, double y, int[][] positions) {
        double sum = 0;
        for (int[] p : positions) {
            sum += Math.hypot(x - p[0], y - p[1]);
        }
        return sum;
    }
    public double getMinDistSum(int[][] positions) {
        double x = 0, y = 0;
        for (int[] p : positions) {
            x += p[0];
            y += p[1];
        }
        x /= positions.length;
        y /= positions.length;
        double step = 50.0;
        double eps = 1e-7;
        int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        while (step > eps) {
            boolean improved = false;
            double curD = distSum(x, y, positions);
            for (int[] d : dirs) {
                double nx = x + d[0] * step;
                double ny = y + d[1] * step;
                if (distSum(nx, ny, positions) < curD) {
                    x = nx;
                    y = ny;
                    improved = true;
                    break;
                }
            }
            if (!improved) step /= 2.0;
        }
        return distSum(x, y, positions);
    }
}`,
        approach: 'Java Numerical Centroid Step-Down',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var getMinDistSum = function(positions) {
    function distSum(x, y) {
        let sum = 0;
        for (const [px, py] of positions) {
            sum += Math.hypot(x - px, y - py);
        }
        return sum;
    }
    let x = 0, y = 0;
    for (const [px, py] of positions) {
        x += px;
        y += py;
    }
    x /= positions.length;
    y /= positions.length;
    let step = 50.0;
    const eps = 1e-7;
    const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    while (step > eps) {
        let improved = false;
        const curD = distSum(x, y);
        for (const [dx, dy] of dirs) {
            const nx = x + dx * step;
            const ny = y + dy * step;
            if (distSum(nx, ny) < curD) {
                x = nx;
                y = ny;
                improved = true;
                break;
            }
        }
        if (!improved) step /= 2.0;
    }
    return distSum(x, y);
};`,
        approach: 'JavaScript Step-Halving Optimization',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import math

class Solution:
    def getMinDistSum(self, positions: list[list[int]]) -> float:
        def dist_sum(x, y):
            return sum(math.hypot(x - px, y - py) for px, py in positions)
        x = sum(p[0] for p in positions) / len(positions)
        y = sum(p[1] for p in positions) / len(positions)
        step = 50.0
        eps = 1e-7
        while step > eps:
            improved = False
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx * step, y + dy * step
                if dist_sum(nx, ny) < dist_sum(x, y):
                    x, y = nx, ny
                    improved = True
                    break
            if not improved:
                step /= 2.0
        return dist_sum(x, y)

sol = Solution()
assert abs(sol.getMinDistSum([[0,1],[1,0],[1,2],[2,1]]) - 4.0) < 1e-4
assert abs(sol.getMinDistSum([[1,1],[3,3]]) - 2.82843) < 1e-4
print("All tests passed successfully.")
`
  },

  // 3. #1516 move-sub-tree-of-n-ary-tree
  {
    slug: 'move-sub-tree-of-n-ary-tree',
    number: 1516,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Trivial Adjacency Case',
        text: 'If p is already a direct child of q, the tree structure remains completely unchanged.'
      },
      {
        level: 2,
        title: 'Ancestor Relationship Check',
        text: 'Determine whether q lies within the subtree of p by running a depth-first traversal starting from p.'
      },
      {
        level: 3,
        title: 'Subtree Reparenting Transitions',
        text: 'If q is in the subtree of p, promote q to replace p in the parent children list before attaching p as a child of q.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def moveSubTree(self, root: \'Node\', p: \'Node\', q: \'Node\') -> \'Node\':\n        if p in q.children:\n            return root\n        dummy = Node(0, [root])\n        parents = {}\n        def find_parents(node):\n            for child in node.children:\n                parents[child] = node\n                find_parents(child)\n        find_parents(dummy)\n        def is_descendant(anc, desc):\n            curr = desc\n            while curr in parents:\n                curr = parents[curr]\n                if curr == anc:\n                    return True\n            return False\n        p_parent = parents[p]\n        q_parent = parents[q]\n        if is_descendant(p, q):\n            q_parent.children.remove(q)\n            idx = p_parent.children.index(p)\n            p_parent.children[idx] = q\n            q.children.append(p)\n        else:\n            p_parent.children.remove(p)\n            q.children.append(p)\n        return dummy.children[0]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: number of nodes in tree'],
      notes: 'Parent map generation and path traversal inspect each tree edge in linear time.',
      whyNaiveFails: 'Moving subtree p under its own descendant creates disconnected cycles if parent reassignments are missed.',
      spaceTimeTradeoff: 'Parent mapping enables ancestor checks and child deletion in linear time.',
      interviewerExpectation: 'Handling the cycle hazard when target q is inside subtree p.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def moveSubTree(self, root: 'Node', p: 'Node', q: 'Node') -> 'Node':
        if p in q.children:
            return root
        dummy = Node(0, [root])
        parents = {}
        def find_parents(node):
            for child in node.children:
                parents[child] = node
                find_parents(child)
        find_parents(dummy)
        def is_descendant(anc, desc):
            curr = desc
            while curr in parents:
                curr = parents[curr]
                if curr == anc:
                    return True
            return False
        p_parent = parents[p]
        q_parent = parents[q]
        if is_descendant(p, q):
            q_parent.children.remove(q)
            idx = p_parent.children.index(p)
            p_parent.children[idx] = q
            q.children.append(p)
        else:
            p_parent.children.remove(p)
            q.children.append(p)
        return dummy.children[0]`,
        approach: 'Parent Map with Subtree Cycle Handling',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    unordered_map<Node*, Node*> parent;
    void getParents(Node* u) {
        for (Node* v : u->children) {
            parent[v] = u;
            getParents(v);
        }
    }
    bool isDescendant(Node* anc, Node* desc) {
        Node* curr = desc;
        while (parent.count(curr)) {
            curr = parent[curr];
            if (curr == anc) return true;
        }
        return false;
    }
public:
    Node* moveSubTree(Node* root, Node* p, Node* q) {
        for (Node* c : q->children) {
            if (c == p) return root;
        }
        Node* dummy = new Node(0, {root});
        getParents(dummy);
        Node* pParent = parent[p];
        Node* qParent = parent[q];
        if (isDescendant(p, q)) {
            auto& qSib = qParent->children;
            qSib.erase(remove(qSib.begin(), qSib.end(), q), qSib.end());
            for (size_t i = 0; i < pParent->children.size(); i++) {
                if (pParent->children[i] == p) {
                    pParent->children[i] = q;
                    break;
                }
            }
            q->children.push_back(p);
        } else {
            auto& pSib = pParent->children;
            pSib.erase(remove(pSib.begin(), pSib.end(), p), pSib.end());
            q->children.push_back(p);
        }
        return dummy->children[0];
    }
};`,
        approach: 'C++ Dummy Root Reparenting',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private Map<Node, Node> parent = new HashMap<>();
    private void getParents(Node u) {
        for (Node v : u.children) {
            parent.put(v, u);
            getParents(v);
        }
    }
    private boolean isDescendant(Node anc, Node desc) {
        Node curr = desc;
        while (parent.containsKey(curr)) {
            curr = parent.get(curr);
            if (curr == anc) return true;
        }
        return false;
    }
    public Node moveSubTree(Node root, Node p, Node q) {
        if (q.children.contains(p)) return root;
        Node dummy = new Node(0, new ArrayList<>(List.of(root)));
        getParents(dummy);
        Node pParent = parent.get(p);
        Node qParent = parent.get(q);
        if (isDescendant(p, q)) {
            qParent.children.remove(q);
            int idx = pParent.children.indexOf(p);
            pParent.children.set(idx, q);
            q.children.add(p);
        } else {
            pParent.children.remove(p);
            q.children.add(p);
        }
        return dummy.children.get(0);
    }
}`,
        approach: 'Java Parent Tracking and Index Replacement',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var moveSubTree = function(root, p, q) {
    if (q.children.includes(p)) return root;
    const dummy = new Node(0, [root]);
    const parent = new Map();
    function getParents(u) {
        for (const v of u.children) {
            parent.set(v, u);
            getParents(v);
        }
    }
    getParents(dummy);
    function isDescendant(anc, desc) {
        let curr = desc;
        while (parent.has(curr)) {
            curr = parent.get(curr);
            if (curr === anc) return true;
        }
        return false;
    }
    const pParent = parent.get(p);
    const qParent = parent.get(q);
    if (isDescendant(p, q)) {
        qParent.children = qParent.children.filter(x => x !== q);
        const idx = pParent.children.indexOf(p);
        pParent.children[idx] = q;
        q.children.push(p);
    } else {
        pParent.children = pParent.children.filter(x => x !== p);
        q.children.push(p);
    }
    return dummy.children[0];
};`,
        approach: 'JavaScript Subtree Reparenting with Cycle Prevention',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Node:
    def __init__(self, val=0, children=None):
        self.val = val
        self.children = children if children is not None else []

class Solution:
    def moveSubTree(self, root: Node, p: Node, q: Node) -> Node:
        if p in q.children: return root
        dummy = Node(0, [root])
        parents = {}
        def find_parents(node):
            for child in node.children:
                parents[child] = node
                find_parents(child)
        find_parents(dummy)
        def is_descendant(anc, desc):
            curr = desc
            while curr in parents:
                curr = parents[curr]
                if curr == anc: return True
            return False
        p_parent = parents[p]
        q_parent = parents[q]
        if is_descendant(p, q):
            q_parent.children.remove(q)
            idx = p_parent.children.index(p)
            p_parent.children[idx] = q
            q.children.append(p)
        else:
            p_parent.children.remove(p)
            q.children.append(p)
        return dummy.children[0]

sol = Solution()
r1 = Node(1)
r2 = Node(2)
r3 = Node(3)
r1.children = [r2, r3]
res = sol.moveSubTree(r1, r2, r3)
assert res == r1
assert r2 in r3.children
print("All tests passed successfully.")
`
  },

  // 4. #1522 diameter-of-n-ary-tree
  {
    slug: 'diameter-of-n-ary-tree',
    number: 1522,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Longest Path Structure',
        text: 'The longest path in any subtree either passes through the subtree root or lies entirely within one of its child subtrees.'
      },
      {
        level: 2,
        title: 'Top Two Child Depths',
        text: 'For each node, compute the heights of all children and track the top two largest depths: max1 and max2.'
      },
      {
        level: 3,
        title: 'Global Diameter Update',
        text: 'Update the global diameter with max1 + max2, and return max1 + 1 to the parent caller.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def diameter(self, root: \'Node\') -> int:\n        ans = 0\n        def dfs(node):\n            nonlocal ans\n            if not node:\n                return 0\n            max1, max2 = 0, 0\n            for child in node.children:\n                h = dfs(child)\n                if h > max1:\n                    max1, max2 = h, max1\n                elif h > max2:\n                    max2 = h\n            ans = max(ans, max1 + max2)\n            return max1 + 1\n        dfs(root)\n        return ans\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(H)',
      variables: ['N: number of nodes in tree', 'H: tree height'],
      notes: 'Visits each node once in linear time with recursion stack bounded by tree height H.',
      whyNaiveFails: 'Computing distances between all pairs of nodes takes quadratic O(N^2) time.',
      spaceTimeTradeoff: 'Bottom-up DFS aggregates top two subtree depths in a single pass.',
      interviewerExpectation: 'Post-order tree traversal tracking two largest child branch heights.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def diameter(self, root: 'Node') -> int:
        ans = 0
        def dfs(node):
            nonlocal ans
            if not node:
                return 0
            max1, max2 = 0, 0
            for child in node.children:
                h = dfs(child)
                if h > max1:
                    max1, max2 = h, max1
                elif h > max2:
                    max2 = h
            ans = max(ans, max1 + max2)
            return max1 + 1
        dfs(root)
        return ans`,
        approach: 'Top Two Subtree Depth DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    int ans = 0;
    int dfs(Node* node) {
        if (!node) return 0;
        int max1 = 0, max2 = 0;
        for (Node* child : node->children) {
            int h = dfs(child);
            if (h > max1) {
                max2 = max1;
                max1 = h;
            } else if (h > max2) {
                max2 = h;
            }
        }
        ans = max(ans, max1 + max2);
        return max1 + 1;
    }
public:
    int diameter(Node* root) {
        ans = 0;
        dfs(root);
        return ans;
    }
};`,
        approach: 'C++ Recursive Height Aggregation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private int ans = 0;
    private int dfs(Node node) {
        if (node == null) return 0;
        int max1 = 0, max2 = 0;
        for (Node child : node.children) {
            int h = dfs(child);
            if (h > max1) {
                max2 = max1;
                max1 = h;
            } else if (h > max2) {
                max2 = h;
            }
        }
        ans = Math.max(ans, max1 + max2);
        return max1 + 1;
    }
    public int diameter(Node root) {
        ans = 0;
        dfs(root);
        return ans;
    }
}`,
        approach: 'Java N-ary Child Height Collection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var diameter = function(root) {
    let ans = 0;
    function dfs(node) {
        if (!node) return 0;
        let max1 = 0, max2 = 0;
        for (const child of node.children) {
            const h = dfs(child);
            if (h > max1) {
                max2 = max1;
                max1 = h;
            } else if (h > max2) {
                max2 = h;
            }
        }
        ans = Math.max(ans, max1 + max2);
        return max1 + 1;
    }
    dfs(root);
    return ans;
};`,
        approach: 'JavaScript Top Two Child Height DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Node:
    def __init__(self, val=0, children=None):
        self.val = val
        self.children = children if children is not None else []

class Solution:
    def diameter(self, root: Node) -> int:
        ans = 0
        def dfs(node):
            nonlocal ans
            if not node: return 0
            max1, max2 = 0, 0
            for child in node.children:
                h = dfs(child)
                if h > max1: max1, max2 = h, max1
                elif h > max2: max2 = h
            ans = max(ans, max1 + max2)
            return max1 + 1
        dfs(root)
        return ans

sol = Solution()
r1 = Node(1, [Node(3, [Node(5), Node(6)]), Node(2), Node(4)])
assert sol.diameter(r1) == 3
print("All tests passed successfully.")
`
  },

  // 5. #1533 find-the-index-of-the-large-integer
  {
    slug: 'find-the-index-of-the-large-integer',
    number: 1533,
    category: 'Algorithms',
    patterns: ['binary-search-basic'],
    hints: [
      {
        level: 1,
        title: 'Binary Partitioning via Subarray Comparison',
        text: 'The search space can be split into two halves of equal length.'
      },
      {
        level: 2,
        title: 'Subarray Comparison Evaluation',
        text: 'compareSub returns 1 if left subarray sum is greater, -1 if right is greater, and 0 if equal.'
      },
      {
        level: 3,
        title: 'Odd Range Center Handling',
        text: 'If the range length is odd, compare the left half to the right half excluding the midpoint; if sums match, midpoint is the target.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def getIndex(self, reader: \'ArrayReader\') -> int:\n        l, r = 0, reader.length() - 1\n        while l < r:\n            length = r - l + 1\n            half = length // 2\n            if length % 2 == 0:\n                cmp = reader.compareSub(l, l + half - 1, l + half, r)\n                if cmp >= 0:\n                    r = l + half - 1\n                else:\n                    l = l + half\n            else:\n                cmp = reader.compareSub(l, l + half - 1, l + half + 1, r)\n                if cmp == 0:\n                    return l + half\n                elif cmp == 1:\n                    r = l + half - 1\n                else:\n                    l = l + half + 1\n        return l\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log N)',
      space: 'O(1)',
      variables: ['N: length of array in reader'],
      notes: 'Each comparison halves the search interval, requiring at most 20 queries for N <= 500,000.',
      whyNaiveFails: 'Comparing individual elements linearly uses O(N) queries, violating API limits.',
      spaceTimeTradeoff: 'Interval halving uses constant variables and logarithmic query bounds.',
      interviewerExpectation: 'Binary search with careful odd/even subarray partition arithmetic.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def getIndex(self, reader: 'ArrayReader') -> int:
        l, r = 0, reader.length() - 1
        while l < r:
            length = r - l + 1
            half = length // 2
            if length % 2 == 0:
                cmp = reader.compareSub(l, l + half - 1, l + half, r)
                if cmp >= 0:
                    r = l + half - 1
                else:
                    l = l + half
            else:
                cmp = reader.compareSub(l, l + half - 1, l + half + 1, r)
                if cmp == 0:
                    return l + half
                elif cmp == 1:
                    r = l + half - 1
                else:
                    l = l + half + 1
        return l`,
        approach: 'Equal Length Binary Search Partition',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int getIndex(ArrayReader &reader) {
        int l = 0, r = reader.length() - 1;
        while (l < r) {
            int len = r - l + 1;
            int half = len / 2;
            if (len % 2 == 0) {
                int cmp = reader.compareSub(l, l + half - 1, l + half, r);
                if (cmp >= 0) r = l + half - 1;
                else l = l + half;
            } else {
                int cmp = reader.compareSub(l, l + half - 1, l + half + 1, r);
                if (cmp == 0) return l + half;
                if (cmp == 1) r = l + half - 1;
                else l = l + half + 1;
            }
        }
        return l;
    }
};`,
        approach: 'C++ Binary Search on Subarray Sums',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int getIndex(ArrayReader reader) {
        int l = 0, r = reader.length() - 1;
        while (l < r) {
            int len = r - l + 1;
            int half = len / 2;
            if (len % 2 == 0) {
                int cmp = reader.compareSub(l, l + half - 1, l + half, r);
                if (cmp >= 0) r = l + half - 1;
                else l = l + half;
            } else {
                int cmp = reader.compareSub(l, l + half - 1, l + half + 1, r);
                if (cmp == 0) return l + half;
                if (cmp == 1) r = l + half - 1;
                else l = l + half + 1;
            }
        }
        return l;
    }
}`,
        approach: 'Java Subarray Binary Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var getIndex = function(reader) {
    let l = 0, r = reader.length() - 1;
    while (l < r) {
        const len = r - l + 1;
        const half = Math.floor(len / 2);
        if (len % 2 === 0) {
            const cmp = reader.compareSub(l, l + half - 1, l + half, r);
            if (cmp >= 0) r = l + half - 1;
            else l = l + half;
        } else {
            const cmp = reader.compareSub(l, l + half - 1, l + half + 1, r);
            if (cmp === 0) return l + half;
            if (cmp === 1) r = l + half - 1;
            else l = l + half + 1;
        }
    }
    return l;
};`,
        approach: 'JavaScript Subarray Comparison Bisection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class MockArrayReader:
    def __init__(self, arr):
        self.arr = arr
    def length(self):
        return len(self.arr)
    def compareSub(self, l, r, x, y):
        s1 = sum(self.arr[l:r+1])
        s2 = sum(self.arr[x:y+1])
        if s1 > s2: return 1
        if s1 < s2: return -1
        return 0

class Solution:
    def getIndex(self, reader) -> int:
        l, r = 0, reader.length() - 1
        while l < r:
            length = r - l + 1
            half = length // 2
            if length % 2 == 0:
                cmp = reader.compareSub(l, l + half - 1, l + half, r)
                if cmp >= 0: r = l + half - 1
                else: l = l + half
            else:
                cmp = reader.compareSub(l, l + half - 1, l + half + 1, r)
                if cmp == 0: return l + half
                elif cmp == 1: r = l + half - 1
                else: l = l + half + 1
        return l

sol = Solution()
r1 = MockArrayReader([7,7,7,7,10,7,7,7])
assert sol.getIndex(r1) == 4
r2 = MockArrayReader([6,6,12])
assert sol.getIndex(r2) == 2
print("All tests passed successfully.")
`
  },

  // 6. #1538 guess-the-majority-in-a-hidden-array
  {
    slug: 'guess-the-majority-in-a-hidden-array',
    number: 1538,
    category: 'Algorithms',
    patterns: ['matrix-simulation'],
    hints: [
      {
        level: 1,
        title: 'Single Element Substitution Parity',
        text: 'Comparing query(0, 1, 2, 3) with query(0, 1, 2, i) reveals whether element i equals element 3.'
      },
      {
        level: 2,
        title: 'Base Element Classification',
        text: 'Use 4-element queries to classify every index i from 4 onwards as either matching element 3 or differing from it.'
      },
      {
        level: 3,
        title: 'Resolving Prefix Elements',
        text: 'Query substituting index 3 with elements 0, 1, 2 to classify the first three indices.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def guessMajority(self, reader: \'ArrayReader\') -> int:\n        n = reader.length()\n        q0123 = reader.query(0, 1, 2, 3)\n        q0124 = reader.query(0, 1, 2, 4)\n        same = [0] * n\n        same[3] = 1\n        for i in range(4, n):\n            same[i] = 1 if reader.query(0, 1, 2, i) == q0123 else 0\n        same[2] = 1 if reader.query(0, 1, 3, 4) == q0124 else 0\n        same[1] = 1 if reader.query(0, 2, 3, 4) == q0124 else 0\n        same[0] = 1 if reader.query(1, 2, 3, 4) == q0124 else 0\n        cnt_same = sum(same)\n        cnt_diff = n - cnt_same\n        if cnt_same > cnt_diff:\n            return 3\n        elif cnt_diff > cnt_same:\n            for i in range(n):\n                if same[i] == 0:\n                    return i\n        return -1\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: length of array in reader'],
      notes: 'Requires exactly N queries to classify every element relative to element 3.',
      whyNaiveFails: 'Querying all combinations of 4 elements causes combinatorial query explosion.',
      spaceTimeTradeoff: 'Fixing 3 anchor indices allows linear classification with N queries.',
      interviewerExpectation: 'Relative equality classification by swapping one element in the 4-tuple query.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def guessMajority(self, reader: 'ArrayReader') -> int:
        n = reader.length()
        q0123 = reader.query(0, 1, 2, 3)
        q0124 = reader.query(0, 1, 2, 4)
        same = [0] * n
        same[3] = 1
        for i in range(4, n):
            same[i] = 1 if reader.query(0, 1, 2, i) == q0123 else 0
        same[2] = 1 if reader.query(0, 1, 3, 4) == q0124 else 0
        same[1] = 1 if reader.query(0, 2, 3, 4) == q0124 else 0
        same[0] = 1 if reader.query(1, 2, 3, 4) == q0124 else 0
        cnt_same = sum(same)
        cnt_diff = n - cnt_same
        if cnt_same > cnt_diff:
            return 3
        elif cnt_diff > cnt_same:
            for i in range(n):
                if same[i] == 0:
                    return i
        return -1`,
        approach: 'Single Swap Relative Parity',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int guessMajority(ArrayReader &reader) {
        int n = reader.length();
        int q0123 = reader.query(0, 1, 2, 3);
        int q0124 = reader.query(0, 1, 2, 4);
        vector<int> same(n, 0);
        same[3] = 1;
        for (int i = 4; i < n; i++) {
            same[i] = (reader.query(0, 1, 2, i) == q0123) ? 1 : 0;
        }
        same[2] = (reader.query(0, 1, 3, 4) == q0124) ? 1 : 0;
        same[1] = (reader.query(0, 2, 3, 4) == q0124) ? 1 : 0;
        same[0] = (reader.query(1, 2, 3, 4) == q0124) ? 1 : 0;
        int cntSame = 0;
        for (int x : same) cntSame += x;
        int cntDiff = n - cntSame;
        if (cntSame > cntDiff) return 3;
        if (cntDiff > cntSame) {
            for (int i = 0; i < n; i++) {
                if (same[i] == 0) return i;
            }
        }
        return -1;
    }
};`,
        approach: 'C++ Parity Swapping Majority Guess',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int guessMajority(ArrayReader reader) {
        int n = reader.length();
        int q0123 = reader.query(0, 1, 2, 3);
        int q0124 = reader.query(0, 1, 2, 4);
        int[] same = new int[n];
        same[3] = 1;
        for (int i = 4; i < n; i++) {
            same[i] = (reader.query(0, 1, 2, i) == q0123) ? 1 : 0;
        }
        same[2] = (reader.query(0, 1, 3, 4) == q0124) ? 1 : 0;
        same[1] = (reader.query(0, 2, 3, 4) == q0124) ? 1 : 0;
        same[0] = (reader.query(1, 2, 3, 4) == q0124) ? 1 : 0;
        int cntSame = 0;
        for (int x : same) cntSame += x;
        int cntDiff = n - cntSame;
        if (cntSame > cntDiff) return 3;
        if (cntDiff > cntSame) {
            for (int i = 0; i < n; i++) {
                if (same[i] == 0) return i;
            }
        }
        return -1;
    }
}`,
        approach: 'Java Relative Query Parity Array',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var guessMajority = function(reader) {
    const n = reader.length();
    const q0123 = reader.query(0, 1, 2, 3);
    const q0124 = reader.query(0, 1, 2, 4);
    const same = new Array(n).fill(0);
    same[3] = 1;
    for (let i = 4; i < n; i++) {
        same[i] = reader.query(0, 1, 2, i) === q0123 ? 1 : 0;
    }
    same[2] = reader.query(0, 1, 3, 4) === q0124 ? 1 : 0;
    same[1] = reader.query(0, 2, 3, 4) === q0124 ? 1 : 0;
    same[0] = reader.query(1, 2, 3, 4) === q0124 ? 1 : 0;
    const cntSame = same.reduce((a, b) => a + b, 0);
    const cntDiff = n - cntSame;
    if (cntSame > cntDiff) return 3;
    if (cntDiff > cntSame) {
        for (let i = 0; i < n; i++) {
            if (same[i] === 0) return i;
        }
    }
    return -1;
};`,
        approach: 'JavaScript Relative Query Parity',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class MockArrayReader:
    def __init__(self, arr):
        self.arr = arr
    def length(self):
        return len(self.arr)
    def query(self, a, b, c, d):
        vals = [self.arr[a], self.arr[b], self.arr[c], self.arr[d]]
        c0 = vals.count(vals[0])
        return 4 if c0 == 4 else (2 if c0 == 2 else 0)

class Solution:
    def guessMajority(self, reader) -> int:
        n = reader.length()
        q0123 = reader.query(0, 1, 2, 3)
        q0124 = reader.query(0, 1, 2, 4)
        same = [0] * n
        same[3] = 1
        for i in range(4, n):
            same[i] = 1 if reader.query(0, 1, 2, i) == q0123 else 0
        same[2] = 1 if reader.query(0, 1, 3, 4) == q0124 else 0
        same[1] = 1 if reader.query(0, 2, 3, 4) == q0124 else 0
        same[0] = 1 if reader.query(1, 2, 3, 4) == q0124 else 0
        cnt_same = sum(same)
        cnt_diff = n - cnt_same
        if cnt_same > cnt_diff: return 3
        elif cnt_diff > cnt_same:
            for i in range(n):
                if same[i] == 0: return i
        return -1

sol = Solution()
r1 = MockArrayReader([0,0,1,0,1,1,1,1])
ans = sol.guessMajority(r1)
assert r1.arr[ans] == 1
print("All tests passed successfully.")
`
  },

  // 7. #1548 the-most-similar-path-in-a-graph
  {
    slug: 'the-most-similar-path-in-a-graph',
    number: 1548,
    category: 'Algorithms',
    patterns: ['graph-dp-dag'],
    hints: [
      {
        level: 1,
        title: 'Stepwise Edit Cost Formulation',
        text: 'The cost of being at node u at step t is 0 if names[u] == targetPath[t], else 1.'
      },
      {
        level: 2,
        title: 'Dynamic Programming State',
        text: 'dp[t][u] represents the minimum edit distance for a valid path of length t ending at node u.'
      },
      {
        level: 3,
        title: 'Parent State Reconstruction',
        text: 'Track parent pointers parent[t][u] to reconstruct the optimal path from step m - 1 down to step 0.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def mostSimilar(self, n: int, roads: list[list[int]], names: list[str], targetPath: list[str]) -> list[int]:\n        m = len(targetPath)\n        adj = [[] for _ in range(n)]\n        for u, v in roads:\n            adj[u].append(v)\n            adj[v].append(u)\n        dp = [[float(\'inf\')] * n for _ in range(m)]\n        parent = [[-1] * n for _ in range(m)]\n        for u in range(n):\n            dp[0][u] = 0 if names[u] == targetPath[0] else 1\n        for t in range(1, m):\n            for u in range(n):\n                cost = 0 if names[u] == targetPath[t] else 1\n                for v in adj[u]:\n                    if dp[t - 1][v] + cost < dp[t][u]:\n                        dp[t][u] = dp[t - 1][v] + cost\n                        parent[t][u] = v\n        best_end = min(range(n), key=lambda u: dp[m - 1][u])\n        path = []\n        curr = best_end\n        for t in range(m - 1, -1, -1):\n            path.append(curr)\n            curr = parent[t][curr]\n        return path[::-1]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(M * (V + E))',
      space: 'O(M * V)',
      variables: ['M: length of target path', 'V: number of cities', 'E: number of roads'],
      notes: 'Iterates through M steps, relaxing all edges across adjacent cities at each step.',
      whyNaiveFails: 'DFS over all graph paths has exponential branching factor.',
      spaceTimeTradeoff: 'DP table of size M * V memoizes optimal sub-paths while recording parent transitions.',
      interviewerExpectation: '2D dynamic programming over path steps and nodes with path reconstruction.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def mostSimilar(self, n: int, roads: list[list[int]], names: list[str], targetPath: list[str]) -> list[int]:
        m = len(targetPath)
        adj = [[] for _ in range(n)]
        for u, v in roads:
            adj[u].append(v)
            adj[v].append(u)
        dp = [[float('inf')] * n for _ in range(m)]
        parent = [[-1] * n for _ in range(m)]
        for u in range(n):
            dp[0][u] = 0 if names[u] == targetPath[0] else 1
        for t in range(1, m):
            for u in range(n):
                cost = 0 if names[u] == targetPath[t] else 1
                for v in adj[u]:
                    if dp[t - 1][v] + cost < dp[t][u]:
                        dp[t][u] = dp[t - 1][v] + cost
                        parent[t][u] = v
        best_end = min(range(n), key=lambda u: dp[m - 1][u])
        path = []
        curr = best_end
        for t in range(m - 1, -1, -1):
            path.append(curr)
            curr = parent[t][curr]
        return path[::-1]`,
        approach: 'Stepwise Graph DP with Parent Backtracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    vector<int> mostSimilar(int n, vector<vector<int>>& roads, vector<string>& names, vector<string>& targetPath) {
        int m = targetPath.size();
        vector<vector<int>> adj(n);
        for (const auto& r : roads) {
            adj[r[0]].push_back(r[1]);
            adj[r[1]].push_back(r[0]);
        }
        vector<vector<int>> dp(m, vector<int>(n, 1e9));
        vector<vector<int>> parent(m, vector<int>(n, -1));
        for (int u = 0; u < n; u++) {
            dp[0][u] = (names[u] == targetPath[0]) ? 0 : 1;
        }
        for (int t = 1; t < m; t++) {
            for (int u = 0; u < n; u++) {
                int cost = (names[u] == targetPath[t]) ? 0 : 1;
                for (int v : adj[u]) {
                    if (dp[t - 1][v] + cost < dp[t][u]) {
                        dp[t][u] = dp[t - 1][v] + cost;
                        parent[t][u] = v;
                    }
                }
            }
        }
        int bestEnd = 0;
        for (int u = 1; u < n; u++) {
            if (dp[m - 1][u] < dp[m - 1][bestEnd]) bestEnd = u;
        }
        vector<int> path;
        int curr = bestEnd;
        for (int t = m - 1; t >= 0; t--) {
            path.push_back(curr);
            curr = parent[t][curr];
        }
        reverse(path.begin(), path.end());
        return path;
    }
};`,
        approach: 'C++ Dynamic Programming Matrix with Backtracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public List<Integer> mostSimilar(int n, int[][] roads, String[] names, String[] targetPath) {
        int m = targetPath.length;
        List<Integer>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] r : roads) {
            adj[r[0]].add(r[1]);
            adj[r[1]].add(r[0]);
        }
        int[][] dp = new int[m][n];
        int[][] parent = new int[m][n];
        for (int[] row : dp) Arrays.fill(row, 1_000_000_000);
        for (int u = 0; u < n; u++) {
            dp[0][u] = names[u].equals(targetPath[0]) ? 0 : 1;
        }
        for (int t = 1; t < m; t++) {
            for (int u = 0; u < n; u++) {
                int cost = names[u].equals(targetPath[t]) ? 0 : 1;
                for (int v : adj[u]) {
                    if (dp[t - 1][v] + cost < dp[t][u]) {
                        dp[t][u] = dp[t - 1][v] + cost;
                        parent[t][u] = v;
                    }
                }
            }
        }
        int bestEnd = 0;
        for (int u = 1; u < n; u++) {
            if (dp[m - 1][u] < dp[m - 1][bestEnd]) bestEnd = u;
        }
        List<Integer> path = new ArrayList<>();
        int curr = bestEnd;
        for (int t = m - 1; t >= 0; t--) {
            path.add(curr);
            curr = parent[t][curr];
        }
        Collections.reverse(path);
        return path;
    }
}`,
        approach: 'Java Dynamic Programming Array with Reconstruction',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var mostSimilar = function(n, roads, names, targetPath) {
    const m = targetPath.length;
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of roads) {
        adj[u].push(v);
        adj[v].push(u);
    }
    const dp = Array.from({ length: m }, () => Array(n).fill(Infinity));
    const parent = Array.from({ length: m }, () => Array(n).fill(-1));
    for (let u = 0; u < n; u++) {
        dp[0][u] = names[u] === targetPath[0] ? 0 : 1;
    }
    for (let t = 1; t < m; t++) {
        for (let u = 0; u < n; u++) {
            const cost = names[u] === targetPath[t] ? 0 : 1;
            for (const v of adj[u]) {
                if (dp[t - 1][v] + cost < dp[t][u]) {
                    dp[t][u] = dp[t - 1][v] + cost;
                    parent[t][u] = v;
                }
            }
        }
    }
    let bestEnd = 0;
    for (let u = 1; u < n; u++) {
        if (dp[m - 1][u] < dp[m - 1][bestEnd]) bestEnd = u;
    }
    const path = [];
    let curr = bestEnd;
    for (let t = m - 1; t >= 0; t--) {
        path.push(curr);
        curr = parent[t][curr];
    }
    return path.reverse();
};`,
        approach: 'JavaScript 2D Dynamic Programming with Path Reconstruction',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Solution:
    def mostSimilar(self, n: int, roads: list[list[int]], names: list[str], targetPath: list[str]) -> list[int]:
        m = len(targetPath)
        adj = [[] for _ in range(n)]
        for u, v in roads:
            adj[u].append(v)
            adj[v].append(u)
        dp = [[float('inf')] * n for _ in range(m)]
        parent = [[-1] * n for _ in range(m)]
        for u in range(n):
            dp[0][u] = 0 if names[u] == targetPath[0] else 1
        for t in range(1, m):
            for u in range(n):
                cost = 0 if names[u] == targetPath[t] else 1
                for v in adj[u]:
                    if dp[t - 1][v] + cost < dp[t][u]:
                        dp[t][u] = dp[t - 1][v] + cost
                        parent[t][u] = v
        best_end = min(range(n), key=lambda u: dp[m - 1][u])
        path = []
        curr = best_end
        for t in range(m - 1, -1, -1):
            path.append(curr)
            curr = parent[t][curr]
        return path[::-1]

sol = Solution()
n = 5
roads = [[0,2],[0,3],[1,2],[1,3],[1,4],[2,4],[3,4]]
names = ["ATL","PEK","LAX","DXB","HND"]
targetPath = ["ATL","DXB","HND","LAX"]
res = sol.mostSimilar(n, roads, names, targetPath)
assert len(res) == 4
print("All tests passed successfully.")
`
  },

  // 8. #1554 strings-differ-by-one-character
  {
    slug: 'strings-differ-by-one-character',
    number: 1554,
    category: 'Algorithms',
    patterns: ['string-matching'],
    hints: [
      {
        level: 1,
        title: 'Wildcard Projection',
        text: 'Replacing the character at index j with a wildcard character generates an equivalence key.'
      },
      {
        level: 2,
        title: 'Position-by-Position Hashing',
        text: 'For each character position j from 0 to m - 1, remove character j from every word and check for collisions.'
      },
      {
        level: 3,
        title: 'Early Exit Collision Detection',
        text: 'If a wildcard pattern has already been observed in the current position set, return true immediately.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def differByOne(self, dict: list[str]) -> bool:\n        m = len(dict[0])\n        for j in range(m):\n            seen = set()\n            for word in dict:\n                pattern = word[:j] + "*" + word[j + 1:]\n                if pattern in seen:\n                    return True\n                seen.add(pattern)\n        return False\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(M^2 * N)',
      space: 'O(M * N)',
      variables: ['M: length of each string', 'N: number of strings in dictionary'],
      notes: 'Iterates through M character positions, checking set collisions across all N strings.',
      whyNaiveFails: 'Comparing all pairs of strings explicitly takes O(N^2 * M) time, exceeding limits for N = 10^5.',
      spaceTimeTradeoff: 'Wildcard masking per position uses O(N * M) auxiliary set memory for linear pair comparisons.',
      interviewerExpectation: 'Position-by-position mask generation or rolling polynomial hashing.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def differByOne(self, dict: list[str]) -> bool:
        m = len(dict[0])
        for j in range(m):
            seen = set()
            for word in dict:
                pattern = word[:j] + "*" + word[j + 1:]
                if pattern in seen:
                    return True
                seen.add(pattern)
        return False`,
        approach: 'Positional Wildcard Masking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    bool differByOne(vector<string>& dict) {
        int m = dict[0].size();
        for (int j = 0; j < m; j++) {
            unordered_set<string> seen;
            for (const string& w : dict) {
                string pat = w;
                pat[j] = '*';
                if (seen.count(pat)) return true;
                seen.insert(pat);
            }
        }
        return false;
    }
};`,
        approach: 'C++ Wildcard Collision Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public boolean differByOne(String[] dict) {
        int m = dict[0].length();
        for (int j = 0; j < m; j++) {
            Set<String> seen = new HashSet<>();
            for (String w : dict) {
                String pat = w.substring(0, j) + "*" + w.substring(j + 1);
                if (seen.contains(pat)) return true;
                seen.add(pat);
            }
        }
        return false;
    }
}`,
        approach: 'Java Wildcard Set Lookup',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var differByOne = function(dict) {
    const m = dict[0].length;
    for (let j = 0; j < m; j++) {
        const seen = new Set();
        for (const w of dict) {
            const pat = w.slice(0, j) + '*' + w.slice(j + 1);
            if (seen.has(pat)) return true;
            seen.add(pat);
        }
    }
    return false;
};`,
        approach: 'JavaScript Positional Wildcard Sets',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Solution:
    def differByOne(self, dict: list[str]) -> bool:
        m = len(dict[0])
        for j in range(m):
            seen = set()
            for word in dict:
                pattern = word[:j] + "*" + word[j + 1:]
                if pattern in seen: return True
                seen.add(pattern)
        return False

sol = Solution()
assert sol.differByOne(["abcd","acbd","aacd"]) == True
assert sol.differByOne(["ab","cd","yz"]) == False
print("All tests passed successfully.")
`
  },

  // 9. #1564 put-boxes-into-the-warehouse-i
  {
    slug: 'put-boxes-into-the-warehouse-i',
    number: 1564,
    category: 'Algorithms',
    patterns: ['greedy-general'],
    hints: [
      {
        level: 1,
        title: 'Effective Room Capacity Pre-computation',
        text: 'A box can only reach room i if its height does not exceed the height of any preceding room from 0 to i.'
      },
      {
        level: 2,
        title: 'Prefix Minimum Transformation',
        text: 'Transform warehouse heights using running minimums: warehouse[i] = min(warehouse[i], warehouse[i - 1]).'
      },
      {
        level: 3,
        title: 'Greedy Smallest Box Placement',
        text: 'Sort boxes ascending, and iterate backward through warehouse rooms placing the smallest available box that fits.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def maxBoxesInWarehouse(self, boxes: list[int], warehouse: list[int]) -> int:\n        n = len(warehouse)\n        for i in range(1, n):\n            warehouse[i] = min(warehouse[i], warehouse[i - 1])\n        boxes.sort()\n        ans = 0\n        i = n - 1\n        for b in boxes:\n            while i >= 0 and warehouse[i] < b:\n                i -= 1\n            if i < 0:\n                break\n            ans += 1\n            i -= 1\n        return ans\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(B log B + W)',
      space: 'O(1)',
      variables: ['B: number of boxes', 'W: number of warehouse rooms'],
      notes: 'Sorting boxes takes O(B log B) time, and warehouse scanning executes in linear O(W) time.',
      whyNaiveFails: 'Testing all box orderings leads to combinatorial search over factorials.',
      spaceTimeTradeoff: 'Prefix minimum in-place modification allows greedy two-pointer matching in constant space.',
      interviewerExpectation: 'Monotonic prefix-min reduction followed by greedy matching.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def maxBoxesInWarehouse(self, boxes: list[int], warehouse: list[int]) -> int:
        n = len(warehouse)
        for i in range(1, n):
            warehouse[i] = min(warehouse[i], warehouse[i - 1])
        boxes.sort()
        ans = 0
        i = n - 1
        for b in boxes:
            while i >= 0 and warehouse[i] < b:
                i -= 1
            if i < 0:
                break
            ans += 1
            i -= 1
        return ans`,
        approach: 'Prefix Minimum Greedy Two-Pointer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int maxBoxesInWarehouse(vector<int>& boxes, vector<int>& warehouse) {
        int n = warehouse.size();
        for (int i = 1; i < n; i++) {
            warehouse[i] = min(warehouse[i], warehouse[i - 1]);
        }
        sort(boxes.begin(), boxes.end());
        int ans = 0;
        int i = n - 1;
        for (int b : boxes) {
            while (i >= 0 && warehouse[i] < b) {
                i--;
            }
            if (i < 0) break;
            ans++;
            i--;
        }
        return ans;
    }
};`,
        approach: 'C++ Running Minimum Greedy Allocation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int maxBoxesInWarehouse(int[] boxes, int[] warehouse) {
        int n = warehouse.length;
        for (int i = 1; i < n; i++) {
            warehouse[i] = Math.min(warehouse[i], warehouse[i - 1]);
        }
        Arrays.sort(boxes);
        int ans = 0;
        int i = n - 1;
        for (int b : boxes) {
            while (i >= 0 && warehouse[i] < b) {
                i--;
            }
            if (i < 0) break;
            ans++;
            i--;
        }
        return ans;
    }
}`,
        approach: 'Java Prefix Min Greedy Matching',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var maxBoxesInWarehouse = function(boxes, warehouse) {
    const n = warehouse.length;
    for (let i = 1; i < n; i++) {
        warehouse[i] = Math.min(warehouse[i], warehouse[i - 1]);
    }
    boxes.sort((a, b) => a - b);
    let ans = 0;
    let i = n - 1;
    for (const b of boxes) {
        while (i >= 0 && warehouse[i] < b) {
            i--;
        }
        if (i < 0) break;
        ans++;
        i--;
    }
    return ans;
};`,
        approach: 'JavaScript Prefix Min In-Place Reduction',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Solution:
    def maxBoxesInWarehouse(self, boxes: list[int], warehouse: list[int]) -> int:
        n = len(warehouse)
        for i in range(1, n):
            warehouse[i] = min(warehouse[i], warehouse[i - 1])
        boxes.sort()
        ans = 0
        i = n - 1
        for b in boxes:
            while i >= 0 and warehouse[i] < b:
                i -= 1
            if i < 0: break
            ans += 1
            i -= 1
        return ans

sol = Solution()
assert sol.maxBoxesInWarehouse([4,3,4,1], [5,3,3,4,1]) == 3
assert sol.maxBoxesInWarehouse([1,2,2,3,4], [3,4,1,2]) == 3
print("All tests passed successfully.")
`
  },

  // 10. #1568 minimum-number-of-days-to-disconnect-island
  {
    slug: 'minimum-number-of-days-to-disconnect-island',
    number: 1568,
    category: 'Algorithms',
    patterns: ['grid-flood-fill'],
    hints: [
      {
        level: 1,
        title: 'Small Upper Bound Principle',
        text: 'Any connected island on a 2D grid can always be disconnected in at most 2 days by isolating an articulation or corner cell.'
      },
      {
        level: 2,
        title: 'Zero Days Check',
        text: 'Count connected components initially. If the count does not equal 1, the grid is already disconnected (return 0).'
      },
      {
        level: 3,
        title: 'One Day Articulation Check',
        text: 'Temporarily convert each land cell to water and test if the component count is no longer 1. If so, return 1; otherwise return 2.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def minDays(self, grid: list[list[int]]) -> int:\n        R, C = len(grid), len(grid[0])\n        def count_islands():\n            vis = set()\n            count = 0\n            for r in range(R):\n                for c in range(C):\n                    if grid[r][c] == 1 and (r, c) not in vis:\n                        count += 1\n                        q = [(r, c)]\n                        vis.add((r, c))\n                        while q:\n                            cr, cc = q.pop()\n                            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n                                nr, nc = cr + dr, cc + dc\n                                if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1 and (nr, nc) not in vis:\n                                    vis.add((nr, nc))\n                                    q.append((nr, nc))\n            return count\n        if count_islands() != 1:\n            return 0\n        for r in range(R):\n            for c in range(C):\n                if grid[r][c] == 1:\n                    grid[r][c] = 0\n                    if count_islands() != 1:\n                        return 1\n                    grid[r][c] = 1\n        return 2\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O((R * C)^2)',
      space: 'O(R * C)',
      variables: ['R: grid rows', 'C: grid columns'],
      notes: 'Component counting executes in O(R * C) time, repeated at most R * C times for each candidate removal.',
      whyNaiveFails: 'General graph cut algorithms are unnecessary given the tight mathematical bound of at most 2 removals.',
      spaceTimeTradeoff: 'Simulating cell removals sequentially bounds extra space to a single visited set.',
      interviewerExpectation: 'Deducing the answer is in {0, 1, 2} and verifying 0 and 1 via flood-fill.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def minDays(self, grid: list[list[int]]) -> int:
        R, C = len(grid), len(grid[0])
        def count_islands():
            vis = set()
            count = 0
            for r in range(R):
                for c in range(C):
                    if grid[r][c] == 1 and (r, c) not in vis:
                        count += 1
                        q = [(r, c)]
                        vis.add((r, c))
                        while q:
                            cr, cc = q.pop()
                            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                                nr, nc = cr + dr, cc + dc
                                if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1 and (nr, nc) not in vis:
                                    vis.add((nr, nc))
                                    q.append((nr, nc))
            return count
        if count_islands() != 1:
            return 0
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 1:
                    grid[r][c] = 0
                    if count_islands() != 1:
                        return 1
                    grid[r][c] = 1
        return 2`,
        approach: 'Bounded Component Disconnection Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    int R, C;
    int countIslands(vector<vector<int>>& grid) {
        vector<vector<bool>> vis(R, vector<bool>(C, false));
        int count = 0;
        int dirs[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                if (grid[r][c] == 1 && !vis[r][c]) {
                    count++;
                    queue<pair<int, int>> q;
                    q.push({r, c});
                    vis[r][c] = true;
                    while (!q.empty()) {
                        auto [cr, cc] = q.front(); q.pop();
                        for (int i = 0; i < 4; i++) {
                            int nr = cr + dirs[i][0], nc = cc + dirs[i][1];
                            if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] == 1 && !vis[nr][nc]) {
                                vis[nr][nc] = true;
                                q.push({nr, nc});
                            }
                        }
                    }
                }
            }
        }
        return count;
    }
public:
    int minDays(vector<vector<int>>& grid) {
        R = grid.size();
        C = grid[0].size();
        if (countIslands(grid) != 1) return 0;
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                if (grid[r][c] == 1) {
                    grid[r][c] = 0;
                    if (countIslands(grid) != 1) return 1;
                    grid[r][c] = 1;
                }
            }
        }
        return 2;
    }
};`,
        approach: 'C++ Island Flood Fill Disconnection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private int R, C;
    private int countIslands(int[][] grid) {
        boolean[][] vis = new boolean[R][C];
        int count = 0;
        int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                if (grid[r][c] == 1 && !vis[r][c]) {
                    count++;
                    Queue<int[]> q = new LinkedList<>();
                    q.offer(new int[]{r, c});
                    vis[r][c] = true;
                    while (!q.isEmpty()) {
                        int[] cur = q.poll();
                        for (int[] d : dirs) {
                            int nr = cur[0] + d[0], nc = cur[1] + d[1];
                            if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] == 1 && !vis[nr][nc]) {
                                vis[nr][nc] = true;
                                q.offer(new int[]{nr, nc});
                            }
                        }
                    }
                }
            }
        }
        return count;
    }
    public int minDays(int[][] grid) {
        R = grid.length;
        C = grid[0].length;
        if (countIslands(grid) != 1) return 0;
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                if (grid[r][c] == 1) {
                    grid[r][c] = 0;
                    if (countIslands(grid) != 1) return 1;
                    grid[r][c] = 1;
                }
            }
        }
        return 2;
    }
}`,
        approach: 'Java Disconnection Upper Bound Simulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var minDays = function(grid) {
    const R = grid.length, C = grid[0].length;
    function countIslands() {
        const vis = Array.from({ length: R }, () => Array(C).fill(false));
        let count = 0;
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (let r = 0; r < R; r++) {
            for (let c = 0; c < C; c++) {
                if (grid[r][c] === 1 && !vis[r][c]) {
                    count++;
                    const q = [[r, c]];
                    vis[r][c] = true;
                    while (q.length > 0) {
                        const [cr, cc] = q.pop();
                        for (const [dr, dc] of dirs) {
                            const nr = cr + dr, nc = cc + dc;
                            if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] === 1 && !vis[nr][nc]) {
                                vis[nr][nc] = true;
                                q.push([nr, nc]);
                            }
                        }
                    }
                }
            }
        }
        return count;
    }
    if (countIslands() !== 1) return 0;
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            if (grid[r][c] === 1) {
                grid[r][c] = 0;
                if (countIslands() !== 1) return 1;
                grid[r][c] = 1;
            }
        }
    }
    return 2;
};`,
        approach: 'JavaScript BFS Articulation Disconnect Test',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Solution:
    def minDays(self, grid: list[list[int]]) -> int:
        R, C = len(grid), len(grid[0])
        def count_islands():
            vis = set()
            count = 0
            for r in range(R):
                for c in range(C):
                    if grid[r][c] == 1 and (r, c) not in vis:
                        count += 1
                        q = [(r, c)]
                        vis.add((r, c))
                        while q:
                            cr, cc = q.pop()
                            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                                nr, nc = cr + dr, cc + dc
                                if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1 and (nr, nc) not in vis:
                                    vis.add((nr, nc))
                                    q.append((nr, nc))
            return count
        if count_islands() != 1: return 0
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 1:
                    grid[r][c] = 0
                    if count_islands() != 1: return 1
                    grid[r][c] = 1
        return 2

sol = Solution()
assert sol.minDays([[0,1,1,0],[0,1,1,0],[0,0,0,0]]) == 2
assert sol.minDays([[1,1]]) == 2
print("All tests passed successfully.")
`
  },

  // 11. #1569 number-of-ways-to-reorder-array-to-get-same-bst
  {
    slug: 'number-of-ways-to-reorder-array-to-get-same-bst',
    number: 1569,
    category: 'Algorithms',
    patterns: ['tree-bst-properties'],
    hints: [
      {
        level: 1,
        title: 'Root Fixed Position',
        text: 'The first element in the list is always inserted as the root of the BST.'
      },
      {
        level: 2,
        title: 'Left and Right Partitioning',
        text: 'Partition all other elements into left sub-elements (< root) and right sub-elements (> root).'
      },
      {
        level: 3,
        title: 'Combinatorial Interleaving Formula',
        text: 'The relative order within left and right must be preserved, yielding comb(L + R, L) * ways(left) * ways(right).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport math\n\nclass Solution:\n    def numOfWays(self, nums: list[int]) -> int:\n        MOD = 10**9 + 7\n        def count_ways(arr):\n            if len(arr) <= 2:\n                return 1\n            root = arr[0]\n            left = [x for x in arr[1:] if x < root]\n            right = [x for x in arr[1:] if x > root]\n            ways = math.comb(len(left) + len(right), len(left)) % MOD\n            return (ways * count_ways(left) * count_ways(right)) % MOD\n        return (count_ways(nums) - 1) % MOD\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N^2)',
      space: 'O(N)',
      variables: ['N: length of nums array'],
      notes: 'Partitioning array elements recursively takes O(N^2) time in the worst case and O(N log N) on average.',
      whyNaiveFails: 'Generating and testing all N! permutations causes factorial time out.',
      spaceTimeTradeoff: 'Divide and conquer with combination math counts valid permutations without generating them.',
      interviewerExpectation: 'Divide-and-conquer recursion interleaving left and right subtrees via combinations.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import math

class Solution:
    def numOfWays(self, nums: list[int]) -> int:
        MOD = 10**9 + 7
        def count_ways(arr):
            if len(arr) <= 2:
                return 1
            root = arr[0]
            left = [x for x in arr[1:] if x < root]
            right = [x for x in arr[1:] if x > root]
            ways = math.comb(len(left) + len(right), len(left)) % MOD
            return (ways * count_ways(left) * count_ways(right)) % MOD
        return (count_ways(nums) - 1) % MOD`,
        approach: 'Divide and Conquer Combination Interleaving',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    const int MOD = 1e9 + 7;
    vector<vector<long long>> comb;
    long long countWays(const vector<int>& arr) {
        if (arr.size() <= 2) return 1;
        int root = arr[0];
        vector<int> left, right;
        for (size_t i = 1; i < arr.size(); i++) {
            if (arr[i] < root) left.push_back(arr[i]);
            else right.push_back(arr[i]);
        }
        int l = left.size(), r = right.size();
        long long ways = comb[l + r][l];
        ways = (ways * countWays(left)) % MOD;
        ways = (ways * countWays(right)) % MOD;
        return ways;
    }
public:
    int numOfWays(vector<int>& nums) {
        int n = nums.size();
        comb.assign(n + 1, vector<long long>(n + 1, 0));
        for (int i = 0; i <= n; i++) {
            comb[i][0] = comb[i][i] = 1;
            for (int j = 1; j < i; j++) {
                comb[i][j] = (comb[i - 1][j - 1] + comb[i - 1][j]) % MOD;
            }
        }
        return (countWays(nums) - 1 + MOD) % MOD;
    }
};`,
        approach: 'C++ Pascal Triangle Combinations Interleaving',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private static final int MOD = 1_000_000_007;
    private long[][] comb;
    private long countWays(List<Integer> arr) {
        if (arr.size() <= 2) return 1;
        int root = arr.get(0);
        List<Integer> left = new ArrayList<>();
        List<Integer> right = new ArrayList<>();
        for (int i = 1; i < arr.size(); i++) {
            if (arr.get(i) < root) left.add(arr.get(i));
            else right.add(arr.get(i));
        }
        int l = left.size(), r = right.size();
        long ways = comb[l + r][l];
        ways = (ways * countWays(left)) % MOD;
        ways = (ways * countWays(right)) % MOD;
        return ways;
    }
    public int numOfWays(int[] nums) {
        int n = nums.length;
        comb = new long[n + 1][n + 1];
        for (int i = 0; i <= n; i++) {
            comb[i][0] = comb[i][i] = 1;
            for (int j = 1; j < i; j++) {
                comb[i][j] = (comb[i - 1][j - 1] + comb[i - 1][j]) % MOD;
            }
        }
        List<Integer> list = new ArrayList<>();
        for (int x : nums) list.add(x);
        return (int)((countWays(list) - 1 + MOD) % MOD);
    }
}`,
        approach: 'Java Combinatorial BST Interleaving',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var numOfWays = function(nums) {
    const MOD = 1000000007n;
    const n = nums.length;
    const comb = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0n));
    for (let i = 0; i <= n; i++) {
        comb[i][0] = comb[i][i] = 1n;
        for (let j = 1; j < i; j++) {
            comb[i][j] = (comb[i - 1][j - 1] + comb[i - 1][j]) % MOD;
        }
    }
    function countWays(arr) {
        if (arr.length <= 2) return 1n;
        const root = arr[0];
        const left = [], right = [];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < root) left.push(arr[i]);
            else right.push(arr[i]);
        }
        const l = left.length, r = right.length;
        let ways = comb[l + r][l];
        ways = (ways * countWays(left)) % MOD;
        ways = (ways * countWays(right)) % MOD;
        return ways;
    }
    const total = countWays(nums);
    return Number((total - 1n + MOD) % MOD);
};`,
        approach: 'JavaScript BigInt Combinatorial Partitioning',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import math

class Solution:
    def numOfWays(self, nums: list[int]) -> int:
        MOD = 10**9 + 7
        def count_ways(arr):
            if len(arr) <= 2: return 1
            root = arr[0]
            left = [x for x in arr[1:] if x < root]
            right = [x for x in arr[1:] if x > root]
            ways = math.comb(len(left) + len(right), len(left)) % MOD
            return (ways * count_ways(left) * count_ways(right)) % MOD
        return (count_ways(nums) - 1) % MOD

sol = Solution()
assert sol.numOfWays([2,1,3]) == 1
assert sol.numOfWays([3,4,5,1,2]) == 5
print("All tests passed successfully.")
`
  },

  // 12. #1570 dot-product-of-two-sparse-vectors
  {
    slug: 'dot-product-of-two-sparse-vectors',
    number: 1570,
    category: 'Algorithms',
    patterns: ['two-pointers-opposite'],
    hints: [
      {
        level: 1,
        title: 'Non-Zero Element Compression',
        text: 'Store only indices where values are non-zero along with their non-zero values.'
      },
      {
        level: 2,
        title: 'Two-Pointer Merging of Pairs',
        text: 'Represent non-zero elements as sorted pairs (index, value) and advance two pointers to find matching indices.'
      },
      {
        level: 3,
        title: 'Matched Product Accumulation',
        text: 'When indices match, add value1 * value2 to the dot product accumulator and advance both pointers.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass SparseVector:\n    def __init__(self, nums: list[int]):\n        self.pairs = [(i, val) for i, val in enumerate(nums) if val != 0]\n\n    def dotProduct(self, vec: \'SparseVector\') -> int:\n        p1, p2 = 0, 0\n        ans = 0\n        while p1 < len(self.pairs) and p2 < len(vec.pairs):\n            i1, v1 = self.pairs[p1]\n            i2, v2 = vec.pairs[p2]\n            if i1 == i2:\n                ans += v1 * v2\n                p1 += 1\n                p2 += 1\n            elif i1 < i2:\n                p1 += 1\n            else:\n                p2 += 1\n        return ans\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(L1 + L2)',
      space: 'O(L)',
      variables: ['L1, L2: number of non-zero elements in each vector', 'L: non-zero entries stored'],
      notes: 'Two-pointer traversal advances monotonically through sorted indices in linear time proportional to non-zero count.',
      whyNaiveFails: 'Multiplying all N dimensions takes O(N) operations even when 99.9% of entries are zero.',
      spaceTimeTradeoff: 'Index-value pair storage scales with non-zero sparsity rather than full array length.',
      interviewerExpectation: 'Sparse index representation paired with two-pointer merge or dictionary intersection.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class SparseVector:
    def __init__(self, nums: list[int]):
        self.pairs = [(i, val) for i, val in enumerate(nums) if val != 0]

    def dotProduct(self, vec: 'SparseVector') -> int:
        p1, p2 = 0, 0
        ans = 0
        while p1 < len(self.pairs) and p2 < len(vec.pairs):
            i1, v1 = self.pairs[p1]
            i2, v2 = vec.pairs[p2]
            if i1 == i2:
                ans += v1 * v2
                p1 += 1
                p2 += 1
            elif i1 < i2:
                p1 += 1
            else:
                p2 += 1
        return ans`,
        approach: 'Index-Value Pairs Two-Pointer Merge',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class SparseVector {
public:
    vector<pair<int, int>> pairs;
    SparseVector(vector<int> &nums) {
        for (int i = 0; i < (int)nums.size(); i++) {
            if (nums[i] != 0) pairs.push_back({i, nums[i]});
        }
    }
    
    int dotProduct(SparseVector& vec) {
        int p1 = 0, p2 = 0;
        int ans = 0;
        while (p1 < (int)pairs.size() && p2 < (int)vec.pairs.size()) {
            if (pairs[p1].first == vec.pairs[p2].first) {
                ans += pairs[p1].second * vec.pairs[p2].second;
                p1++;
                p2++;
            } else if (pairs[p1].first < vec.pairs[p2].first) {
                p1++;
            } else {
                p2++;
            }
        }
        return ans;
    }
};`,
        approach: 'C++ Two Pointers on Sorted Non-Zero Pairs',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class SparseVector {
    List<int[]> pairs = new ArrayList<>();
    SparseVector(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != 0) pairs.add(new int[]{i, nums[i]});
        }
    }
    
    public int dotProduct(SparseVector vec) {
        int p1 = 0, p2 = 0;
        int ans = 0;
        while (p1 < pairs.size() && p2 < vec.pairs.size()) {
            int[] e1 = pairs.get(p1);
            int[] e2 = vec.pairs.get(p2);
            if (e1[0] == e2[0]) {
                ans += e1[1] * e2[1];
                p1++;
                p2++;
            } else if (e1[0] < e2[0]) {
                p1++;
            } else {
                p2++;
            }
        }
        return ans;
    }
}`,
        approach: 'Java Two-Pointer Sparse Entry Dot Product',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var SparseVector = function(nums) {
    this.pairs = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) this.pairs.push([i, nums[i]]);
    }
};

SparseVector.prototype.dotProduct = function(vec) {
    let p1 = 0, p2 = 0;
    let ans = 0;
    while (p1 < this.pairs.length && p2 < vec.pairs.length) {
        const [i1, v1] = this.pairs[p1];
        const [i2, v2] = vec.pairs[p2];
        if (i1 === i2) {
            ans += v1 * v2;
            p1++;
            p2++;
        } else if (i1 < i2) {
            p1++;
        } else {
            p2++;
        }
    }
    return ans;
};`,
        approach: 'JavaScript Two-Pointer Sparse Array Merge',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class SparseVector:
    def __init__(self, nums: list[int]):
        self.pairs = [(i, val) for i, val in enumerate(nums) if val != 0]

    def dotProduct(self, vec: 'SparseVector') -> int:
        p1, p2 = 0, 0
        ans = 0
        while p1 < len(self.pairs) and p2 < len(vec.pairs):
            i1, v1 = self.pairs[p1]
            i2, v2 = vec.pairs[p2]
            if i1 == i2:
                ans += v1 * v2
                p1 += 1
                p2 += 1
            elif i1 < i2:
                p1 += 1
            else:
                p2 += 1
        return ans

v1 = SparseVector([1,0,0,2,3])
v2 = SparseVector([0,3,0,4,0])
assert v1.dotProduct(v2) == 8
v3 = SparseVector([0,1,0,0,0])
v4 = SparseVector([0,0,0,0,0])
assert v3.dotProduct(v4) == 0
print("All tests passed successfully.")
`
  },

  // 13. #1580 put-boxes-into-the-warehouse-ii
  {
    slug: 'put-boxes-into-the-warehouse-ii',
    number: 1580,
    category: 'Algorithms',
    patterns: ['greedy-general'],
    hints: [
      {
        level: 1,
        title: 'Bidirectional Entry Advantage',
        text: 'Boxes can enter from either the left entrance or the right entrance.'
      },
      {
        level: 2,
        title: 'Effective Height Minimum Bounds',
        text: 'Room i can be accessed from the left with capacity min(warehouse[0..i]) or from the right with capacity min(warehouse[i..n-1]).'
      },
      {
        level: 3,
        title: 'Greedy Outermost Placement',
        text: 'Sort boxes descending, and place each box into the most restrictive valid boundary room available.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def maxBoxesInWarehouse(self, boxes: list[int], warehouse: list[int]) -> int:\n        boxes.sort(reverse=True)\n        l, r = 0, len(warehouse) - 1\n        ans = 0\n        for b in boxes:\n            if l > r:\n                break\n            if warehouse[l] >= b:\n                ans += 1\n                l += 1\n            elif warehouse[r] >= b:\n                ans += 1\n                r -= 1\n        return ans\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(B log B + W)',
      space: 'O(1)',
      variables: ['B: number of boxes', 'W: warehouse rooms'],
      notes: 'Sorting boxes takes O(B log B) time, and two-pointer placement scans the warehouse in O(W) time.',
      whyNaiveFails: 'Trying all permutations of which side each box enters from leads to exponential branching.',
      spaceTimeTradeoff: 'Dual-pointer convergence places largest boxes greedily at outer edges without extra memory.',
      interviewerExpectation: 'Greedy two-pointer placement sorting boxes descending and filling available ends.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def maxBoxesInWarehouse(self, boxes: list[int], warehouse: list[int]) -> int:
        boxes.sort(reverse=True)
        l, r = 0, len(warehouse) - 1
        ans = 0
        for b in boxes:
            if l > r:
                break
            if warehouse[l] >= b:
                ans += 1
                l += 1
            elif warehouse[r] >= b:
                ans += 1
                r -= 1
        return ans`,
        approach: 'Descending Box Sort with Two-Pointer End Allocation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    int maxBoxesInWarehouse(vector<int>& boxes, vector<int>& warehouse) {
        sort(boxes.rbegin(), boxes.rend());
        int l = 0, r = warehouse.size() - 1;
        int ans = 0;
        for (int b : boxes) {
            if (l > r) break;
            if (warehouse[l] >= b) {
                ans++;
                l++;
            } else if (warehouse[r] >= b) {
                ans++;
                r--;
            }
        }
        return ans;
    }
};`,
        approach: 'C++ Bidirectional Two-Pointer Greedy Placement',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int maxBoxesInWarehouse(int[] boxes, int[] warehouse) {
        Arrays.sort(boxes);
        int l = 0, r = warehouse.length - 1;
        int ans = 0;
        for (int i = boxes.length - 1; i >= 0; i--) {
            int b = boxes[i];
            if (l > r) break;
            if (warehouse[l] >= b) {
                ans++;
                l++;
            } else if (warehouse[r] >= b) {
                ans++;
                r--;
            }
        }
        return ans;
    }
}`,
        approach: 'Java Bidirectional Two-Pointer Allocation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var maxBoxesInWarehouse = function(boxes, warehouse) {
    boxes.sort((a, b) => b - a);
    let l = 0, r = warehouse.length - 1;
    let ans = 0;
    for (const b of boxes) {
        if (l > r) break;
        if (warehouse[l] >= b) {
            ans++;
            l++;
        } else if (warehouse[r] >= b) {
            ans++;
            r--;
        }
    }
    return ans;
};`,
        approach: 'JavaScript Bidirectional Greedy Two-Pointer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Solution:
    def maxBoxesInWarehouse(self, boxes: list[int], warehouse: list[int]) -> int:
        boxes.sort(reverse=True)
        l, r = 0, len(warehouse) - 1
        ans = 0
        for b in boxes:
            if l > r: break
            if warehouse[l] >= b:
                ans += 1
                l += 1
            elif warehouse[r] >= b:
                ans += 1
                r -= 1
        return ans

sol = Solution()
assert sol.maxBoxesInWarehouse([1,2,2,3,4], [3,4,1,2]) == 4
assert sol.maxBoxesInWarehouse([3,5,5,2], [2,1,3,4,5]) == 3
print("All tests passed successfully.")
`
  },

  // 14. #1586 binary-search-tree-iterator-ii
  {
    slug: 'binary-search-tree-iterator-ii',
    number: 1586,
    category: 'Algorithms',
    patterns: ['tree-bst-properties'],
    hints: [
      {
        level: 1,
        title: 'Traversed History List',
        text: 'Maintain an array of visited values and an index pointer pointing to the current position.'
      },
      {
        level: 2,
        title: 'Lazy Controlled Inorder Traversal',
        text: 'When moving next beyond the cached history, continue iterative inorder traversal pushing left children to a stack.'
      },
      {
        level: 3,
        title: 'Bidirectional Pointer Transitions',
        text: 'prev() simply decrements pointer and returns the prior cached value; hasPrev() checks if pointer > 0.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass BSTIterator:\n    def __init__(self, root: \'TreeNode\'):\n        self.stack = []\n        self.history = []\n        self.idx = -1\n        self._push_left(root)\n\n    def _push_left(self, node):\n        while node:\n            self.stack.append(node)\n            node = node.left\n\n    def hasNext(self) -> bool:\n        return self.idx + 1 < len(self.history) or len(self.stack) > 0\n\n    def next(self) -> int:\n        self.idx += 1\n        if self.idx < len(self.history):\n            return self.history[self.idx]\n        node = self.stack.pop()\n        self._push_left(node.right)\n        self.history.append(node.val)\n        return node.val\n\n    def hasPrev(self) -> bool:\n        return self.idx > 0\n\n    def prev(self) -> int:\n        self.idx -= 1\n        return self.history[self.idx]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) amortized',
      space: 'O(N)',
      variables: ['N: number of nodes in BST'],
      notes: 'Each node is pushed to stack once and popped once during lazy traversal, giving amortized O(1) operations.',
      whyNaiveFails: 'Re-traversing tree nodes backwards without caching requires parent pointers.',
      spaceTimeTradeoff: 'Lazy history buffer bounds memory to O(V) visited nodes rather than precomputing all upfront.',
      interviewerExpectation: 'Lazy inorder stack combined with dynamic history caching.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class BSTIterator:
    def __init__(self, root: 'TreeNode'):
        self.stack = []
        self.history = []
        self.idx = -1
        self._push_left(root)

    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def hasNext(self) -> bool:
        return self.idx + 1 < len(self.history) or len(self.stack) > 0

    def next(self) -> int:
        self.idx += 1
        if self.idx < len(self.history):
            return self.history[self.idx]
        node = self.stack.pop()
        self._push_left(node.right)
        self.history.append(node.val)
        return node.val

    def hasPrev(self) -> bool:
        return self.idx > 0

    def prev(self) -> int:
        self.idx -= 1
        return self.history[self.idx]`,
        approach: 'Lazy Inorder Stack with History List',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class BSTIterator {
    stack<TreeNode*> st;
    vector<int> history;
    int idx = -1;
    void pushLeft(TreeNode* node) {
        while (node) {
            st.push(node);
            node = node->left;
        }
    }
public:
    BSTIterator(TreeNode* root) {
        pushLeft(root);
    }
    
    bool hasNext() {
        return idx + 1 < (int)history.size() || !st.empty();
    }
    
    int next() {
        idx++;
        if (idx < (int)history.size()) return history[idx];
        TreeNode* node = st.top();
        st.pop();
        pushLeft(node->right);
        history.push_back(node->val);
        return node->val;
    }
    
    bool hasPrev() {
        return idx > 0;
    }
    
    int prev() {
        idx--;
        return history[idx];
    }
};`,
        approach: 'C++ Lazy Inorder Stack with History Caching',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class BSTIterator {
    private Deque<TreeNode> stack = new ArrayDeque<>();
    private List<Integer> history = new ArrayList<>();
    private int idx = -1;
    private void pushLeft(TreeNode node) {
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
    }
    public BSTIterator(TreeNode root) {
        pushLeft(root);
    }
    
    public boolean hasNext() {
        return idx + 1 < history.size() || !stack.isEmpty();
    }
    
    public int next() {
        idx++;
        if (idx < history.size()) return history.get(idx);
        TreeNode node = stack.pop();
        pushLeft(node.right);
        history.add(node.val);
        return node.val;
    }
    
    public boolean hasPrev() {
        return idx > 0;
    }
    
    public int prev() {
        idx--;
        return history.get(idx);
    }
}`,
        approach: 'Java Lazy Traversal Stack and History Pointer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var BSTIterator = function(root) {
    this.stack = [];
    this.history = [];
    this.idx = -1;
    this.pushLeft(root);
};

BSTIterator.prototype.pushLeft = function(node) {
    while (node) {
        this.stack.push(node);
        node = node.left;
    }
};

BSTIterator.prototype.hasNext = function() {
    return this.idx + 1 < this.history.length || this.stack.length > 0;
};

BSTIterator.prototype.next = function() {
    this.idx++;
    if (this.idx < this.history.length) return this.history[this.idx];
    const node = this.stack.pop();
    this.pushLeft(node.right);
    this.history.push(node.val);
    return node.val;
};

BSTIterator.prototype.hasPrev = function() {
    return this.idx > 0;
};

BSTIterator.prototype.prev = function() {
    this.idx--;
    return this.history[this.idx];
};`,
        approach: 'JavaScript Lazy Inorder Stack with History Tracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class BSTIterator:
    def __init__(self, root: TreeNode):
        self.stack = []
        self.history = []
        self.idx = -1
        self._push_left(root)

    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def hasNext(self) -> bool:
        return self.idx + 1 < len(self.history) or len(self.stack) > 0

    def next(self) -> int:
        self.idx += 1
        if self.idx < len(self.history):
            return self.history[self.idx]
        node = self.stack.pop()
        self._push_left(node.right)
        self.history.append(node.val)
        return node.val

    def hasPrev(self) -> bool:
        return self.idx > 0

    def prev(self) -> int:
        self.idx -= 1
        return self.history[self.idx]

r = TreeNode(7, TreeNode(3), TreeNode(15, TreeNode(9), TreeNode(20)))
it = BSTIterator(r)
assert it.next() == 3
assert it.next() == 7
assert it.prev() == 3
assert it.next() == 7
assert it.hasNext() == True
assert it.next() == 9
assert it.next() == 15
assert it.next() == 20
assert it.hasNext() == False
assert it.hasPrev() == True
assert it.prev() == 15
print("All tests passed successfully.")
`
  },

  // 15. #1597 build-binary-expression-tree-from-infix-expression
  {
    slug: 'build-binary-expression-tree-from-infix-expression',
    number: 1597,
    category: 'Algorithms',
    patterns: ['stack-parentheses-parser'],
    hints: [
      {
        level: 1,
        title: 'Operator Precedence and Two Accumulators',
        text: 'Maintain an operand collection of tree nodes and an operator buffer for tokens.'
      },
      {
        level: 2,
        title: 'Precedence Invariant',
        text: 'Multiplication and division have higher precedence than addition and subtraction.'
      },
      {
        level: 3,
        title: 'Tree Construction Reductions',
        text: 'When popping an operator op, pop right node and left node, create Node(op, left, right), and push it to the node stack.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def expTree(self, s: str) -> \'Node\':\n        ops = []\n        nodes = []\n        prec = {\'+\': 1, \'-\': 1, \'*\': 2, \'/\': 2}\n        def reduce():\n            op = ops.pop()\n            r = nodes.pop()\n            l = nodes.pop()\n            nodes.append(Node(op, l, r))\n        for ch in s:\n            if ch.isdigit():\n                nodes.append(Node(ch))\n            elif ch == \'(\':\n                ops.append(ch)\n            elif ch == \')\':\n                while ops and ops[-1] != \'(\':\n                    reduce()\n                ops.pop()\n            else:\n                while ops and ops[-1] in prec and prec[ops[-1]] >= prec[ch]:\n                    reduce()\n                ops.append(ch)\n        while ops:\n            reduce()\n        return nodes[0]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(N)',
      variables: ['N: length of infix expression string s'],
      notes: 'Each character is pushed and popped from operator and node stacks at most once in linear time.',
      whyNaiveFails: 'Full syntax tree backtracking causes exponential re-parsing of parenthesized sub-expressions.',
      spaceTimeTradeoff: 'Dual-stack Shunting-Yard parser processes infix grammar in a single left-to-right pass.',
      interviewerExpectation: 'Classic Shunting-Yard operator precedence parsing building binary nodes.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def expTree(self, s: str) -> 'Node':
        ops = []
        nodes = []
        prec = {'+': 1, '-': 1, '*': 2, '/': 2}
        def reduce():
            op = ops.pop()
            r = nodes.pop()
            l = nodes.pop()
            nodes.append(Node(op, l, r))
        for ch in s:
            if ch.isdigit():
                nodes.append(Node(ch))
            elif ch == '(':
                ops.append(ch)
            elif ch == ')':
                while ops and ops[-1] != '(':
                    reduce()
                ops.pop()
            else:
                while ops and ops[-1] in prec and prec[ops[-1]] >= prec[ch]:
                    reduce()
                ops.append(ch)
        while ops:
            reduce()
        return nodes[0]`,
        approach: 'Dual Stack Shunting-Yard Parse Tree',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    int prec(char op) {
        if (op == '+' || op == '-') return 1;
        if (op == '*' || op == '/') return 2;
        return 0;
    }
    void reduce(stack<char>& ops, stack<Node*>& nodes) {
        char op = ops.top(); ops.pop();
        Node* r = nodes.top(); nodes.pop();
        Node* l = nodes.top(); nodes.pop();
        nodes.push(new Node(op, l, r));
    }
public:
    Node* expTree(string s) {
        stack<char> ops;
        stack<Node*> nodes;
        for (char ch : s) {
            if (isdigit(ch)) {
                nodes.push(new Node(ch));
            } else if (ch == '(') {
                ops.push(ch);
            } else if (ch == ')') {
                while (!ops.empty() && ops.top() != '(') {
                    reduce(ops, nodes);
                }
                ops.pop();
            } else {
                while (!ops.empty() && prec(ops.top()) >= prec(ch)) {
                    reduce(ops, nodes);
                }
                ops.push(ch);
            }
        }
        while (!ops.empty()) reduce(ops, nodes);
        return nodes.top();
    }
};`,
        approach: 'C++ Shunting-Yard Expression Parsing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private int prec(char op) {
        if (op == '+' || op == '-') return 1;
        if (op == '*' || op == '/') return 2;
        return 0;
    }
    private void reduce(Deque<Character> ops, Deque<Node> nodes) {
        char op = ops.pop();
        Node r = nodes.pop();
        Node l = nodes.pop();
        nodes.push(new Node(op, l, r));
    }
    public Node expTree(String s) {
        Deque<Character> ops = new ArrayDeque<>();
        Deque<Node> nodes = new ArrayDeque<>();
        for (char ch : s.toCharArray()) {
            if (Character.isDigit(ch)) {
                nodes.push(new Node(ch));
            } else if (ch == '(') {
                ops.push(ch);
            } else if (ch == ')') {
                while (!ops.isEmpty() && ops.peek() != '(') {
                    reduce(ops, nodes);
                }
                ops.pop();
            } else {
                while (!ops.isEmpty() && prec(ops.peek()) >= prec(ch)) {
                    reduce(ops, nodes);
                }
                ops.push(ch);
            }
        }
        while (!ops.isEmpty()) reduce(ops, nodes);
        return nodes.peek();
    }
}`,
        approach: 'Java Dual Stack Expression Parser',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var expTree = function(s) {
    const ops = [];
    const nodes = [];
    const prec = { '+': 1, '-': 1, '*': 2, '/': 2 };
    function reduce() {
        const op = ops.pop();
        const r = nodes.pop();
        const l = nodes.pop();
        nodes.push(new Node(op, l, r));
    }
    for (const ch of s) {
        if (ch >= '0' && ch <= '9') {
            nodes.push(new Node(ch));
        } else if (ch === '(') {
            ops.push(ch);
        } else if (ch === ')') {
            while (ops.length > 0 && ops[ops.length - 1] !== '(') {
                reduce();
            }
            ops.pop();
        } else {
            while (ops.length > 0 && prec[ops[ops.length - 1]] >= prec[ch]) {
                reduce();
            }
            ops.push(ch);
        }
    }
    while (ops.length > 0) reduce();
    return nodes[0];
};`,
        approach: 'JavaScript Shunting-Yard Dual Stack Tree Builder',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Node:
    def __init__(self, val=' ', left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def expTree(self, s: str) -> Node:
        ops = []
        nodes = []
        prec = {'+': 1, '-': 1, '*': 2, '/': 2}
        def reduce():
            op = ops.pop()
            r = nodes.pop()
            l = nodes.pop()
            nodes.append(Node(op, l, r))
        for ch in s:
            if ch.isdigit():
                nodes.append(Node(ch))
            elif ch == '(':
                ops.append(ch)
            elif ch == ')':
                while ops and ops[-1] != '(':
                    reduce()
                ops.pop()
            else:
                while ops and ops[-1] in prec and prec[ops[-1]] >= prec[ch]:
                    reduce()
                ops.append(ch)
        while ops:
            reduce()
        return nodes[0]

sol = Solution()
r1 = sol.expTree("3*4-2*5")
assert r1.val == '-'
assert r1.left.val == '*'
assert r1.right.val == '*'
print("All tests passed successfully.")
`
  },

  // 16. #1600 throne-inheritance
  {
    slug: 'throne-inheritance',
    number: 1600,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Ordered Children Adjacency',
        text: 'Represent royal family relations as an adjacency list where children are appended in chronological birth order.'
      },
      {
        level: 2,
        title: 'Tombstone Deletion',
        text: 'Record deceased individuals in a dead set without deleting their subtree nodes.'
      },
      {
        level: 3,
        title: 'Preorder DFS Traversal',
        text: 'Traverse family members using preorder depth-first search, appending alive members to the succession order.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass ThroneInheritance:\n    def __init__(self, kingName: str):\n        self.king = kingName\n        self.children = {kingName: []}\n        self.dead = set()\n\n    def birth(self, parentName: str, childName: str) -> None:\n        self.children[parentName].append(childName)\n        self.children[childName] = []\n\n    def death(self, name: str) -> None:\n        self.dead.add(name)\n\n    def getInheritanceOrder(self) -> list[str]:\n        ans = []\n        def dfs(name):\n            if name not in self.dead:\n                ans.append(name)\n            for child in self.children.get(name, []):\n                dfs(child)\n        dfs(self.king)\n        return ans\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) birth/death, O(N) getInheritanceOrder',
      space: 'O(N)',
      variables: ['N: total number of persons created'],
      notes: 'Birth and death operations execute in O(1) time; inheritance order traverses the N-ary tree in linear O(N) time.',
      whyNaiveFails: 'Rebuilding the entire succession tree on each death or birth incurs quadratic time.',
      spaceTimeTradeoff: 'Tombstone deletion avoids subtree relocations at the cost of checking set membership during preorder traversal.',
      interviewerExpectation: 'Preorder DFS traversal of an N-ary hierarchy combined with tombstone set filtering.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class ThroneInheritance:
    def __init__(self, kingName: str):
        self.king = kingName
        self.children = {kingName: []}
        self.dead = set()

    def birth(self, parentName: str, childName: str) -> None:
        self.children[parentName].append(childName)
        self.children[childName] = []

    def death(self, name: str) -> None:
        self.dead.add(name)

    def getInheritanceOrder(self) -> list[str]:
        ans = []
        def dfs(name):
            if name not in self.dead:
                ans.append(name)
            for child in self.children.get(name, []):
                dfs(child)
        dfs(self.king)
        return ans`,
        approach: 'Preorder DFS with Tombstone Death Set',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class ThroneInheritance {
    string king;
    unordered_map<string, vector<string>> children;
    unordered_set<string> dead;
    void dfs(const string& u, vector<string>& order) {
        if (!dead.count(u)) order.push_back(u);
        if (children.count(u)) {
            for (const string& v : children[u]) {
                dfs(v, order);
            }
        }
    }
public:
    ThroneInheritance(string kingName) : king(kingName) {
    }
    
    void birth(string parentName, string childName) {
        children[parentName].push_back(childName);
    }
    
    void death(string name) {
        dead.insert(name);
    }
    
    vector<string> getInheritanceOrder() {
        vector<string> order;
        dfs(king, order);
        return order;
    }
};`,
        approach: 'C++ N-ary Preorder Traversal and Hash Set',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class ThroneInheritance {
    private String king;
    private Map<String, List<String>> children = new HashMap<>();
    private Set<String> dead = new HashSet<>();
    private void dfs(String u, List<String> order) {
        if (!dead.contains(u)) order.add(u);
        for (String v : children.getOrDefault(u, Collections.emptyList())) {
            dfs(v, order);
        }
    }
    public ThroneInheritance(String kingName) {
        this.king = kingName;
        children.put(kingName, new ArrayList<>());
    }
    
    public void birth(String parentName, String childName) {
        children.computeIfAbsent(parentName, k -> new ArrayList<>()).add(childName);
    }
    
    public void death(String name) {
        dead.add(name);
    }
    
    public List<String> getInheritanceOrder() {
        List<String> order = new ArrayList<>();
        dfs(king, order);
        return order;
    }
}`,
        approach: 'Java Hierarchy Adjacency Preorder DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var ThroneInheritance = function(kingName) {
    this.king = kingName;
    this.children = new Map([[kingName, []]]);
    this.dead = new Set();
};

ThroneInheritance.prototype.birth = function(parentName, childName) {
    if (!this.children.has(parentName)) this.children.set(parentName, []);
    this.children.get(parentName).push(childName);
    this.children.set(childName, []);
};

ThroneInheritance.prototype.death = function(name) {
    this.dead.add(name);
};

ThroneInheritance.prototype.getInheritanceOrder = function() {
    const ans = [];
    const dfs = (name) => {
        if (!this.dead.has(name)) ans.push(name);
        for (const child of (this.children.get(name) || [])) {
            dfs(child);
        }
    };
    dfs(this.king);
    return ans;
};`,
        approach: 'JavaScript Map Adjacency and Set Filtered DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class ThroneInheritance:
    def __init__(self, kingName: str):
        self.king = kingName
        self.children = {kingName: []}
        self.dead = set()

    def birth(self, parentName: str, childName: str) -> None:
        if parentName not in self.children: self.children[parentName] = []
        self.children[parentName].append(childName)
        self.children[childName] = []

    def death(self, name: str) -> None:
        self.dead.add(name)

    def getInheritanceOrder(self) -> list[str]:
        ans = []
        def dfs(name):
            if name not in self.dead: ans.append(name)
            for child in self.children.get(name, []): dfs(child)
        dfs(self.king)
        return ans

t = ThroneInheritance("king")
t.birth("king", "andy")
t.birth("king", "bob")
t.birth("king", "catherine")
t.birth("andy", "matthew")
t.birth("bob", "alex")
t.birth("bob", "asha")
assert t.getInheritanceOrder() == ["king", "andy", "matthew", "bob", "alex", "asha", "catherine"]
t.death("bob")
assert t.getInheritanceOrder() == ["king", "andy", "matthew", "alex", "asha", "catherine"]
print("All tests passed successfully.")
`
  },

  // 17. #1602 find-nearest-right-node-in-binary-tree
  {
    slug: 'find-nearest-right-node-in-binary-tree',
    number: 1602,
    category: 'Algorithms',
    patterns: ['tree-bfs-level-order'],
    hints: [
      {
        level: 1,
        title: 'Level Order Traversal',
        text: 'Traverse the binary tree level-by-level using breadth-first search.'
      },
      {
        level: 2,
        title: 'Level Boundary Tracking',
        text: 'When inspecting node u at index i of a level, check if i + 1 < level_size.'
      },
      {
        level: 3,
        title: 'Immediate Right Neighbor Return',
        text: 'If u is the last node on its level, return null; otherwise return the next node popped from the queue.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import deque\n\nclass Solution:\n    def findNearestRightNode(self, root: \'TreeNode\', u: \'TreeNode\') -> \'TreeNode\':\n        q = deque([root])\n        while q:\n            sz = len(q)\n            for i in range(sz):\n                node = q.popleft()\n                if node == u:\n                    return q.popleft() if i < sz - 1 else None\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n        return None\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(W)',
      variables: ['N: number of nodes in tree', 'W: maximum tree width'],
      notes: 'Level order traversal visits each node once in linear time with queue memory bounded by maximum level width W.',
      whyNaiveFails: 'Depth-first search requires passing and matching exact level coordinates across separate recursive branches.',
      spaceTimeTradeoff: 'Breadth-first search keeps only nodes from the current level in memory.',
      interviewerExpectation: 'Breadth-first level-order traversal with level size loop inspection.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class Solution:
    def findNearestRightNode(self, root: 'TreeNode', u: 'TreeNode') -> 'TreeNode':
        q = deque([root])
        while q:
            sz = len(q)
            for i in range(sz):
                node = q.popleft()
                if node == u:
                    return q.popleft() if i < sz - 1 else None
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
        return None`,
        approach: 'Level-Order BFS Immediate Right Check',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    TreeNode* findNearestRightNode(TreeNode* root, TreeNode* u) {
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front();
                q.pop();
                if (node == u) {
                    return (i < sz - 1) ? q.front() : nullptr;
                }
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        return nullptr;
    }
};`,
        approach: 'C++ Level Order Queue Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public TreeNode findNearestRightNode(TreeNode root, TreeNode u) {
        Queue<TreeNode> q = new LinkedList<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();
                if (node == u) {
                    return (i < sz - 1) ? q.peek() : null;
                }
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
        }
        return null;
    }
}`,
        approach: 'Java Level-by-Level Queue Inspection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var findNearestRightNode = function(root, u) {
    const q = [root];
    while (q.length > 0) {
        const sz = q.length;
        for (let i = 0; i < sz; i++) {
            const node = q.shift();
            if (node === u) {
                return (i < sz - 1) ? q.shift() : null;
            }
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }
    return null;
};`,
        approach: 'JavaScript BFS Level Queue Inspection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from collections import deque

class Solution:
    def findNearestRightNode(self, root: TreeNode, u: TreeNode) -> TreeNode:
        q = deque([root])
        while q:
            sz = len(q)
            for i in range(sz):
                node = q.popleft()
                if node == u:
                    return q.popleft() if i < sz - 1 else None
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
        return None

sol = Solution()
n4 = TreeNode(4)
n5 = TreeNode(5)
n2 = TreeNode(2, n4, n5)
n6 = TreeNode(6)
n3 = TreeNode(3, None, n6)
root = TreeNode(1, n2, n3)
assert sol.findNearestRightNode(root, n4) == n5
assert sol.findNearestRightNode(root, n5) == n6
assert sol.findNearestRightNode(root, n6) is None
print("All tests passed successfully.")
`
  },

  // 18. #1603 design-parking-system
  {
    slug: 'design-parking-system',
    number: 1603,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Slot Capacity Mapping',
        text: 'Store available slots for big (1), medium (2), and small (3) cars in an array.'
      },
      {
        level: 2,
        title: 'Slot Availability Check',
        text: 'Check if slots for carType are greater than 0.'
      },
      {
        level: 3,
        title: 'Decrement and Return',
        text: 'If slots exist, decrement capacity by 1 and return true; otherwise return false.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass ParkingSystem:\n    def __init__(self, big: int, medium: int, small: int):\n        self.slots = [0, big, medium, small]\n\n    def addCar(self, carType: int) -> bool:\n        if self.slots[carType] > 0:\n            self.slots[carType] -= 1\n            return True\n        return False\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['constant space'],
      notes: 'Direct indexing and decrement execute in constant time and space.',
      whyNaiveFails: 'No complex branching needed for simple fixed capacity checking.',
      spaceTimeTradeoff: 'Constant sized array storage provides optimal O(1) performance.',
      interviewerExpectation: 'Clean 1-indexed array mapping of car types.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class ParkingSystem:
    def __init__(self, big: int, medium: int, small: int):
        self.slots = [0, big, medium, small]

    def addCar(self, carType: int) -> bool:
        if self.slots[carType] > 0:
            self.slots[carType] -= 1
            return True
        return False`,
        approach: '1-Indexed Array Counter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class ParkingSystem {
    int slots[4];
public:
    ParkingSystem(int big, int medium, int small) {
        slots[1] = big;
        slots[2] = medium;
        slots[3] = small;
    }
    
    bool addCar(int carType) {
        if (slots[carType] > 0) {
            slots[carType]--;
            return true;
        }
        return false;
    }
};`,
        approach: 'C++ Fixed Array Decrement',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class ParkingSystem {
    private int[] slots;

    public ParkingSystem(int big, int medium, int small) {
        slots = new int[]{0, big, medium, small};
    }
    
    public boolean addCar(int carType) {
        if (slots[carType] > 0) {
            slots[carType]--;
            return true;
        }
        return false;
    }
}`,
        approach: 'Java Fixed Array Slot Tracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var ParkingSystem = function(big, medium, small) {
    this.slots = [0, big, medium, small];
};

ParkingSystem.prototype.addCar = function(carType) {
    if (this.slots[carType] > 0) {
        this.slots[carType]--;
        return true;
    }
    return false;
};`,
        approach: 'JavaScript Array Slot Reservation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class ParkingSystem:
    def __init__(self, big: int, medium: int, small: int):
        self.slots = [0, big, medium, small]

    def addCar(self, carType: int) -> bool:
        if self.slots[carType] > 0:
            self.slots[carType] -= 1
            return True
        return False

ps = ParkingSystem(1, 1, 0)
assert ps.addCar(1) == True
assert ps.addCar(1) == False
assert ps.addCar(2) == True
assert ps.addCar(3) == False
print("All tests passed successfully.")
`
  },

  // 19. #1612 check-if-two-expression-trees-are-equivalent
  {
    slug: 'check-if-two-expression-trees-are-equivalent',
    number: 1612,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    hints: [
      {
        level: 1,
        title: 'Associative and Commutative Addition',
        text: 'Since the only operator present is addition "+", order of evaluation does not change the multiset of leaf variable values.'
      },
      {
        level: 2,
        title: 'Leaf Frequency Counting',
        text: 'Collect the frequency of every variable letter across all leaves of both trees.'
      },
      {
        level: 3,
        title: 'Multiset Equality Verification',
        text: 'Two expression trees are equivalent if and only if their leaf variable frequency distributions are identical.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import Counter\n\nclass Solution:\n    def checkEquivalence(self, root1: \'Node\', root2: \'Node\') -> bool:\n        def count_leaves(node, counter):\n            if not node:\n                return\n            if node.val != \'+\':\n                counter[node.val] += 1\n            count_leaves(node.left, counter)\n            count_leaves(node.right, counter)\n        c1 = Counter()\n        c2 = Counter()\n        count_leaves(root1, c1)\n        count_leaves(root2, c2)\n        return c1 == c2\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N1 + N2)',
      space: 'O(H1 + H2)',
      variables: ['N1, N2: number of nodes in each expression tree', 'H1, H2: tree heights'],
      notes: 'Traverses each tree in linear time to count leaf frequencies across the 26 lowercase English letters.',
      whyNaiveFails: 'Comparing tree structures directly fails because associativity allows different tree shapes to represent identical sums.',
      spaceTimeTradeoff: 'Counting leaf multiset frequencies ignores tree shape and verifies commutativity directly.',
      interviewerExpectation: 'Recognizing additive commutativity and comparing multiset leaf counts.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import Counter

class Solution:
    def checkEquivalence(self, root1: 'Node', root2: 'Node') -> bool:
        def count_leaves(node, counter):
            if not node:
                return
            if node.val != '+':
                counter[node.val] += 1
            count_leaves(node.left, counter)
            count_leaves(node.right, counter)
        c1 = Counter()
        c2 = Counter()
        count_leaves(root1, c1)
        count_leaves(root2, c2)
        return c1 == c2`,
        approach: 'Leaf Character Frequency Comparison',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    void countLeaves(Node* node, vector<int>& counts) {
        if (!node) return;
        if (node->val != '+') counts[node->val - 'a']++;
        countLeaves(node->left, counts);
        countLeaves(node->right, counts);
    }
public:
    bool checkEquivalence(Node* root1, Node* root2) {
        vector<int> c1(26, 0), c2(26, 0);
        countLeaves(root1, c1);
        countLeaves(root2, c2);
        return c1 == c2;
    }
};`,
        approach: 'C++ Frequency Array Equality',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    private void countLeaves(Node node, int[] counts) {
        if (node == null) return;
        if (node.val != '+') counts[node.val - 'a']++;
        countLeaves(node.left, counts);
        countLeaves(node.right, counts);
    }
    public boolean checkEquivalence(Node root1, Node root2) {
        int[] c1 = new int[26];
        int[] c2 = new int[26];
        countLeaves(root1, c1);
        countLeaves(root2, c2);
        return Arrays.equals(c1, c2);
    }
}`,
        approach: 'Java Leaf Variable Frequency Counting',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var checkEquivalence = function(root1, root2) {
    const c1 = Array(26).fill(0);
    const c2 = Array(26).fill(0);
    function countLeaves(node, arr) {
        if (!node) return;
        if (node.val !== '+') {
            arr[node.val.charCodeAt(0) - 97]++;
        }
        countLeaves(node.left, arr);
        countLeaves(node.right, arr);
    }
    countLeaves(root1, c1);
    countLeaves(root2, c2);
    for (let i = 0; i < 26; i++) {
        if (c1[i] !== c2[i]) return false;
    }
    return true;
};`,
        approach: 'JavaScript Character Frequency Array Verification',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Node:
    def __init__(self, val=' ', left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from collections import Counter

class Solution:
    def checkEquivalence(self, root1: Node, root2: Node) -> bool:
        def count_leaves(node, counter):
            if not node: return
            if node.val != '+': counter[node.val] += 1
            count_leaves(node.left, counter)
            count_leaves(node.right, counter)
        c1, c2 = Counter(), Counter()
        count_leaves(root1, c1)
        count_leaves(root2, c2)
        return c1 == c2

sol = Solution()
r1 = Node('+', Node('a'), Node('+', Node('b'), Node('c')))
r2 = Node('+', Node('+', Node('b'), Node('c')), Node('a'))
assert sol.checkEquivalence(r1, r2) == True
r3 = Node('+', Node('a'), Node('b'))
r4 = Node('+', Node('a'), Node('a'))
assert sol.checkEquivalence(r3, r4) == False
print("All tests passed successfully.")
`
  },

  // 20. #1618 maximum-font-to-fit-a-sentence-in-a-screen
  {
    slug: 'maximum-font-to-fit-a-sentence-in-a-screen',
    number: 1618,
    category: 'Algorithms',
    patterns: ['binary-search-answer'],
    hints: [
      {
        level: 1,
        title: 'Monotonic Font Fitting Property',
        text: 'If a sentence fits on screen at font size S, it is guaranteed to fit at any smaller font size.'
      },
      {
        level: 2,
        title: 'Screen Height and Width Invariants',
        text: 'For size S, fontInfo.getHeight(S) must be <= h, and sum(fontInfo.getWidth(S, ch) for ch in text) must be <= w.'
      },
      {
        level: 3,
        title: 'Binary Search on Available Fonts',
        text: 'Binary search over the sorted fonts array to identify the largest size that fits.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def maxFont(self, text: str, w: int, h: int, fonts: list[int], fontInfo: \'FontInfo\') -> int:\n        def fits(size):\n            if fontInfo.getHeight(size) > h:\n                return False\n            total_w = sum(fontInfo.getWidth(size, ch) for ch in text)\n            return total_w <= w\n        l, r = 0, len(fonts) - 1\n        ans = -1\n        while l <= r:\n            mid = (l + r) // 2\n            if fits(fonts[mid]):\n                ans = fonts[mid]\n                l = mid + 1\n            else:\n                r = mid - 1\n        return ans\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(L * log F)',
      space: 'O(1)',
      variables: ['L: text length', 'F: number of font sizes'],
      notes: 'Each binary search step evaluates string width in O(L) time across O(log F) steps.',
      whyNaiveFails: 'Testing every font size sequentially from largest to smallest takes O(F * L) time.',
      spaceTimeTradeoff: 'Binary search over sorted font sizes minimizes font metric queries.',
      interviewerExpectation: 'Binary search over sorted answer space with monotonic fit predicate.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def maxFont(self, text: str, w: int, h: int, fonts: list[int], fontInfo: 'FontInfo') -> int:
        def fits(size):
            if fontInfo.getHeight(size) > h:
                return False
            total_w = sum(fontInfo.getWidth(size, ch) for ch in text)
            return total_w <= w
        l, r = 0, len(fonts) - 1
        ans = -1
        while l <= r:
            mid = (l + r) // 2
            if fits(fonts[mid]):
                ans = fonts[mid]
                l = mid + 1
            else:
                r = mid - 1
        return ans`,
        approach: 'Binary Search on Font Sizes',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
    bool fits(const string& text, int w, int h, int size, FontInfo& fontInfo) {
        if (fontInfo.getHeight(size) > h) return false;
        long long totalW = 0;
        for (char ch : text) {
            totalW += fontInfo.getWidth(size, ch);
            if (totalW > w) return false;
        }
        return true;
    }
public:
    int maxFont(string text, int w, int h, vector<int>& fonts, FontInfo fontInfo) {
        int l = 0, r = fonts.size() - 1;
        int ans = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (fits(text, w, h, fonts[mid], fontInfo)) {
                ans = fonts[mid];
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return ans;
    }
};`,
        approach: 'C++ Binary Search with Height and Width Pruning',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `interface FontInfo {
    public int getWidth(int fontSize, char ch);
    public int getHeight(int fontSize);
}

class Solution {
    private boolean fits(String text, int w, int h, int size, FontInfo fontInfo) {
        if (fontInfo.getHeight(size) > h) return false;
        long totalW = 0;
        for (char ch : text.toCharArray()) {
            totalW += fontInfo.getWidth(size, ch);
            if (totalW > w) return false;
        }
        return true;
    }
    public int maxFont(String text, int w, int h, int[] fonts, FontInfo fontInfo) {
        int l = 0, r = fonts.length - 1;
        int ans = -1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (fits(text, w, h, fonts[mid], fontInfo)) {
                ans = fonts[mid];
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return ans;
    }
}`,
        approach: 'Java Binary Search on Monotonic Fit',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var maxFont = function(text, w, h, fonts, fontInfo) {
    function fits(size) {
        if (fontInfo.getHeight(size) > h) return false;
        let totalW = 0;
        for (const ch of text) {
            totalW += fontInfo.getWidth(size, ch);
            if (totalW > w) return false;
        }
        return true;
    }
    let l = 0, r = fonts.length - 1;
    let ans = -1;
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        if (fits(fonts[mid])) {
            ans = fonts[mid];
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    return ans;
};`,
        approach: 'JavaScript Binary Search on Font Capacity',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class MockFontInfo:
    def __init__(self, char_w, h):
        self.char_w = char_w
        self.h = h
    def getWidth(self, size, ch):
        return size * self.char_w
    def getHeight(self, size):
        return size * self.h

class Solution:
    def maxFont(self, text: str, w: int, h: int, fonts: list[int], fontInfo) -> int:
        def fits(size):
            if fontInfo.getHeight(size) > h: return False
            total_w = sum(fontInfo.getWidth(size, ch) for ch in text)
            return total_w <= w
        l, r = 0, len(fonts) - 1
        ans = -1
        while l <= r:
            mid = (l + r) // 2
            if fits(fonts[mid]):
                ans = fonts[mid]
                l = mid + 1
            else:
                r = mid - 1
        return ans

sol = Solution()
fi1 = MockFontInfo(1, 1)
assert sol.maxFont("helloworld", 80, 20, [6,8,10,12,14,16,18,24,36], fi1) == 8
fi2 = MockFontInfo(2, 3)
assert sol.maxFont("helloworld", 80, 20, [6,8,10,12,14,16,18,24,36], fi2) == -1
print("All tests passed successfully.")
`
  },

  // 21. #1622 fancy-sequence
  {
    slug: 'fancy-sequence',
    number: 1622,
    category: 'Algorithms',
    patterns: ['math-number-theory'],
    hints: [
      {
        level: 1,
        title: 'Global Affine Transformation State',
        text: 'Represent global operations as scale A and offset B such that any original value v becomes (A * v + B) modulo prime.'
      },
      {
        level: 2,
        title: 'Modular Inverse Normalization',
        text: 'When appending val, store its normalized base form: (val - B) * modular_inverse(A) modulo prime.'
      },
      {
        level: 3,
        title: 'Transformation Updating',
        text: 'addAll(inc) updates B = (B + inc) modulo prime; multAll(m) updates A = (A * m) and B = (B * m) modulo prime.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Fancy:\n    def __init__(self):\n        self.MOD = 10**9 + 7\n        self.vals = []\n        self.mul = 1\n        self.add = 0\n\n    def append(self, val: int) -> None:\n        inv = pow(self.mul, self.MOD - 2, self.MOD)\n        normalized = ((val - self.add) % self.MOD * inv) % self.MOD\n        self.vals.append(normalized)\n\n    def addAll(self, inc: int) -> None:\n        self.add = (self.add + inc) % self.MOD\n\n    def multAll(self, m: int) -> None:\n        self.mul = (self.mul * m) % self.MOD\n        self.add = (self.add * m) % self.MOD\n\n    def getIndex(self, idx: int) -> int:\n        if idx >= len(self.vals):\n            return -1\n        return (self.vals[idx] * self.mul + self.add) % self.MOD\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log MOD) append, O(1) addAll/multAll/getIndex',
      space: 'O(N)',
      variables: ['N: total number of appended values'],
      notes: 'Fermat Little Theorem computes inverse in O(log MOD) time, while all sequence transformations run in O(1) time.',
      whyNaiveFails: 'Iterating through every element on addAll and multAll takes O(N) per call, causing timeout.',
      spaceTimeTradeoff: 'Global multiplier and adder reduce range modifications to constant-time scalar operations.',
      interviewerExpectation: 'Lazy affine transformation tracking using modular arithmetic and Fermat Little Theorem inversion.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Fancy:
    def __init__(self):
        self.MOD = 10**9 + 7
        self.vals = []
        self.mul = 1
        self.add = 0

    def append(self, val: int) -> None:
        inv = pow(self.mul, self.MOD - 2, self.MOD)
        normalized = ((val - self.add) % self.MOD * inv) % self.MOD
        self.vals.append(normalized)

    def addAll(self, inc: int) -> None:
        self.add = (self.add + inc) % self.MOD

    def multAll(self, m: int) -> None:
        self.mul = (self.mul * m) % self.MOD
        self.add = (self.add * m) % self.MOD

    def getIndex(self, idx: int) -> int:
        if idx >= len(self.vals):
            return -1
        return (self.vals[idx] * self.mul + self.add) % self.MOD`,
        approach: 'Affine Transformation with Modular Inverse',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Fancy {
    const long long MOD = 1e9 + 7;
    vector<long long> vals;
    long long mul = 1, add = 0;
    long long power(long long base, long long exp) {
        long long res = 1;
        base %= MOD;
        while (exp > 0) {
            if (exp % 2 == 1) res = (res * base) % MOD;
            base = (base * base) % MOD;
            exp /= 2;
        }
        return res;
    }
    long long modInverse(long long n) {
        return power(n, MOD - 2);
    }
public:
    Fancy() {
    }
    
    void append(int val) {
        long long inv = modInverse(mul);
        long long norm = ((val - add) % MOD + MOD) % MOD;
        norm = (norm * inv) % MOD;
        vals.push_back(norm);
    }
    
    void addAll(int inc) {
        add = (add + inc) % MOD;
    }
    
    void multAll(int m) {
        mul = (mul * m) % MOD;
        add = (add * m) % MOD;
    }
    
    int getIndex(int idx) {
        if (idx >= (int)vals.size()) return -1;
        return (vals[idx] * mul + add) % MOD;
    }
};`,
        approach: 'C++ Modular Inverse and Affine Scalars',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Fancy {
    private static final long MOD = 1_000_000_007L;
    private List<Long> vals = new ArrayList<>();
    private long mul = 1, add = 0;
    private long power(long base, long exp) {
        long res = 1;
        base %= MOD;
        while (exp > 0) {
            if (exp % 2 == 1) res = (res * base) % MOD;
            base = (base * base) % MOD;
            exp /= 2;
        }
        return res;
    }
    private long modInverse(long n) {
        return power(n, MOD - 2);
    }
    public Fancy() {
    }
    
    public void append(int val) {
        long inv = modInverse(mul);
        long norm = ((val - add) % MOD + MOD) % MOD;
        norm = (norm * inv) % MOD;
        vals.add(norm);
    }
    
    public void addAll(int inc) {
        add = (add + inc) % MOD;
    }
    
    public void multAll(int m) {
        mul = (mul * m) % MOD;
        add = (add * m) % MOD;
    }
    
    public int getIndex(int idx) {
        if (idx >= vals.size()) return -1;
        return (int)((vals.get(idx) * mul + add) % MOD);
    }
}`,
        approach: 'Java Fermat Inverse Affine Tracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var Fancy = function() {
    this.MOD = 1000000007n;
    this.vals = [];
    this.mul = 1n;
    this.add = 0n;
};

Fancy.prototype.power = function(base, exp) {
    let res = 1n;
    base = base % this.MOD;
    while (exp > 0n) {
        if (exp % 2n === 1n) res = (res * base) % this.MOD;
        base = (base * base) % this.MOD;
        exp /= 2n;
    }
    return res;
};

Fancy.prototype.append = function(val) {
    const inv = this.power(this.mul, this.MOD - 2n);
    let norm = (BigInt(val) - this.add) % this.MOD;
    if (norm < 0n) norm += this.MOD;
    norm = (norm * inv) % this.MOD;
    this.vals.push(norm);
};

Fancy.prototype.addAll = function(inc) {
    this.add = (this.add + BigInt(inc)) % this.MOD;
};

Fancy.prototype.multAll = function(m) {
    this.mul = (this.mul * BigInt(m)) % this.MOD;
    this.add = (this.add * BigInt(m)) % this.MOD;
};

Fancy.prototype.getIndex = function(idx) {
    if (idx >= this.vals.length) return -1;
    return Number((this.vals[idx] * this.mul + this.add) % this.MOD);
};`,
        approach: 'JavaScript BigInt Affine Sequence Modulo',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Fancy:
    def __init__(self):
        self.MOD = 10**9 + 7
        self.vals = []
        self.mul = 1
        self.add = 0

    def append(self, val: int) -> None:
        inv = pow(self.mul, self.MOD - 2, self.MOD)
        normalized = ((val - self.add) % self.MOD * inv) % self.MOD
        self.vals.append(normalized)

    def addAll(self, inc: int) -> None:
        self.add = (self.add + inc) % self.MOD

    def multAll(self, m: int) -> None:
        self.mul = (self.mul * m) % self.MOD
        self.add = (self.add * m) % self.MOD

    def getIndex(self, idx: int) -> int:
        if idx >= len(self.vals):
            return -1
        return (self.vals[idx] * self.mul + self.add) % self.MOD

fancy = Fancy()
fancy.append(2)
fancy.addAll(3)
fancy.append(7)
fancy.multAll(2)
assert fancy.getIndex(0) == 10
fancy.addAll(3)
fancy.append(10)
fancy.multAll(2)
assert fancy.getIndex(0) == 26
assert fancy.getIndex(1) == 34
assert fancy.getIndex(2) == 20
print("All tests passed successfully.")
`
  },

  // 22. #1628 design-an-expression-tree-with-evaluate-function
  {
    slug: 'design-an-expression-tree-with-evaluate-function',
    number: 1628,
    category: 'Algorithms',
    patterns: ['stack-parentheses-parser'],
    hints: [
      {
        level: 1,
        title: 'Postfix Expression Tree Construction',
        text: 'Iterate through postfix tokens assembling tree nodes from bottom to top.'
      },
      {
        level: 2,
        title: 'Operand and Operator Nodes',
        text: 'When encountering an operand, push a numeric node; when encountering an operator, pop two children and attach them.'
      },
      {
        level: 3,
        title: 'Polymorphic or Recursive Evaluation',
        text: 'Implement evaluate() on nodes by recursively evaluating left and right child nodes and applying the arithmetic operation.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Node:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\n    def evaluate(self) -> int:\n        if self.val.isdigit():\n            return int(self.val)\n        l = self.left.evaluate()\n        r = self.right.evaluate()\n        if self.val == \'+\': return l + r\n        if self.val == \'-\': return l - r\n        if self.val == \'*\': return l * r\n        if self.val == \'/\': return int(l / r)\n        return 0\n\nclass TreeBuilder:\n    def buildTree(self, postfix: list[str]) -> Node:\n        stack = []\n        for token in postfix:\n            if token in {\'+\', \'-\', \'*\', \'/\'}:\n                r = stack.pop()\n                l = stack.pop()\n                stack.append(Node(token, l, r))\n            else:\n                stack.append(Node(token))\n        return stack[0]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N) build, O(N) evaluate',
      space: 'O(N)',
      variables: ['N: number of tokens in postfix expression'],
      notes: 'Constructing tree visits each token once, and evaluating executes postorder traversal in linear time.',
      whyNaiveFails: 'String replacements or non-tree re-evaluation misses object-oriented abstraction requirements.',
      spaceTimeTradeoff: 'Explicit binary expression tree captures operation precedence with minimal stack overhead.',
      interviewerExpectation: 'Clean object-oriented node hierarchy implementing evaluate() method.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

    def evaluate(self) -> int:
        if self.val.isdigit():
            return int(self.val)
        l = self.left.evaluate()
        r = self.right.evaluate()
        if self.val == '+': return l + r
        if self.val == '-': return l - r
        if self.val == '*': return l * r
        if self.val == '/': return int(l / r)
        return 0

class TreeBuilder:
    def buildTree(self, postfix: list[str]) -> Node:
        stack = []
        for token in postfix:
            if token in {'+', '-', '*', '/'}:
                r = stack.pop()
                l = stack.pop()
                stack.append(Node(token, l, r))
            else:
                stack.append(Node(token))
        return stack[0]`,
        approach: 'Postfix Expression Stack with Recursive Evaluate',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class ExprNode : public Node {
public:
    string val;
    ExprNode* left;
    ExprNode* right;
    ExprNode(string v, ExprNode* l = nullptr, ExprNode* r = nullptr)
        : val(v), left(l), right(r) {}
    int evaluate() {
        if (isdigit(val[0])) return stoi(val);
        int l = left->evaluate();
        int r = right->evaluate();
        if (val == "+") return l + r;
        if (val == "-") return l - r;
        if (val == "*") return l * r;
        if (val == "/") return l / r;
        return 0;
    }
};

class TreeBuilder {
public:
    Node* buildTree(vector<string>& postfix) {
        stack<ExprNode*> st;
        for (const string& token : postfix) {
            if (token == "+" || token == "-" || token == "*" || token == "/") {
                ExprNode* r = st.top(); st.pop();
                ExprNode* l = st.top(); st.pop();
                st.push(new ExprNode(token, l, r));
            } else {
                st.push(new ExprNode(token));
            }
        }
        return st.top();
    }
};`,
        approach: 'C++ Polymorphic Expression Tree Node',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class ExprNode {
    String val;
    ExprNode left, right;
    ExprNode(String val) { this.val = val; }
    ExprNode(String val, ExprNode left, ExprNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
    public int evaluate() {
        if (Character.isDigit(val.charAt(0))) {
            return Integer.parseInt(val);
        }
        int l = left.evaluate();
        int r = right.evaluate();
        if (val.equals("+")) return l + r;
        if (val.equals("-")) return l - r;
        if (val.equals("*")) return l * r;
        if (val.equals("/")) return l / r;
        return 0;
    }
}

class TreeBuilder {
    public ExprNode buildTree(String[] postfix) {
        Deque<ExprNode> stack = new ArrayDeque<>();
        for (String token : postfix) {
            if (token.equals("+") || token.equals("-") || token.equals("*") || token.equals("/")) {
                ExprNode r = stack.pop();
                ExprNode l = stack.pop();
                stack.push(new ExprNode(token, l, r));
            } else {
                stack.push(new ExprNode(token));
            }
        }
        return stack.pop();
    }
}`,
        approach: 'Java Postfix Expression Tree Builder',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `class ExprNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
    evaluate() {
        if (!isNaN(Number(this.val))) return Number(this.val);
        const l = this.left.evaluate();
        const r = this.right.evaluate();
        if (this.val === '+') return l + r;
        if (this.val === '-') return l - r;
        if (this.val === '*') return l * r;
        if (this.val === '/') return Math.trunc(l / r);
        return 0;
    }
}

class TreeBuilder {
    buildTree(postfix) {
        const stack = [];
        for (const token of postfix) {
            if (['+', '-', '*', '/'].includes(token)) {
                const r = stack.pop();
                const l = stack.pop();
                stack.push(new ExprNode(token, l, r));
            } else {
                stack.push(new ExprNode(token));
            }
        }
        return stack[0];
    }
}`,
        approach: 'JavaScript Stack Expression Tree Evaluator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

    def evaluate(self) -> int:
        if self.val.isdigit(): return int(self.val)
        l = self.left.evaluate()
        r = self.right.evaluate()
        if self.val == '+': return l + r
        if self.val == '-': return l - r
        if self.val == '*': return l * r
        if self.val == '/': return int(l / r)
        return 0

class TreeBuilder:
    def buildTree(self, postfix: list[str]) -> Node:
        stack = []
        for token in postfix:
            if token in {'+', '-', '*', '/'}:
                r = stack.pop()
                l = stack.pop()
                stack.append(Node(token, l, r))
            else:
                stack.append(Node(token))
        return stack[0]

tb = TreeBuilder()
t1 = tb.buildTree(["3","4","+","2","*","7","/"])
assert t1.evaluate() == 2
t2 = tb.buildTree(["4","5","2","+","*"])
assert t2.evaluate() == 28
print("All tests passed successfully.")
`
  }
];
