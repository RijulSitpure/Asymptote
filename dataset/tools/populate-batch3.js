import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');

export const BATCH3_PROBLEMS = [
  {
    slug: 'invert-binary-tree',
    number: 226,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    twist_type: 'Subtree Child Swapping Recursion',
    method: 'invertTree',
    hints: [
      {
        level: 1,
        title: 'Subtree Swapping Obstacle',
        text: 'Inverting a tree requires swapping left and right subtrees at every level. If you swap the children of a node first, what happens to their unvisited child subtrees? How can recursive subproblem decomposition ensure every descendant is inverted?'
      },
      {
        level: 2,
        title: 'Mirror Inversion Invariant',
        text: 'The inverse of a binary tree is formed by swapping its left and right subtrees, where each subtree is itself recursively inverted.'
      },
      {
        level: 3,
        title: 'Recursive Pointer Swap Procedure',
        text: 'Base case: if the current node is null, return null. Swap the node\'s left and right child pointers. Recursively call the inversion procedure on the left child and right child. Return the current node.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        root.left, root.right = root.right, root.left
        self.invertTree(root.left)
        self.invertTree(root.right)
        return root
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(H)',
      variables: ['N: number of nodes in tree (0 <= N <= 100)', 'H: height of tree (log N balanced, N skewed)'],
      notes: 'Every node is visited once and swapped in-place. Auxiliary space is bounded by the recursion stack height.',
      whyNaiveFails: 'Rebuilding a new mirrored tree from serialization requires extra node allocations and multiple passes taking O(N) space and higher overhead.',
      spaceTimeTradeoff: 'In-place pointer swapping achieves O(N) time with O(H) call stack frames without allocating new nodes.',
      interviewerExpectation: 'Clear base case for null root, in-place child pointer swap, understanding recursion stack space proportional to height.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        root.left, root.right = root.right, root.left
        self.invertTree(root.left)
        self.invertTree(root.right)
        return root`,
        approach: 'Recursive In-Place Subtree Swapping',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        TreeNode* temp = root->left;
        root->left = root->right;
        root->right = temp;
        invertTree(root->left);
        invertTree(root->right);
        return root;
    }
};`,
        approach: 'Pointer Swapping with Subtree Recursion',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        invertTree(root.left);
        invertTree(root.right);
        return root;
    }
}`,
        approach: 'In-Place Child Swapping',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if (!root) return null;
    const temp = root.left;
    root.left = root.right;
    root.right = temp;
    invertTree(root.left);
    invertTree(root.right);
    return root;
};`,
        approach: 'Recursive In-Place Pointer Swap',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'maximum-depth-of-binary-tree',
    number: 104,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    twist_type: 'Subtree Height Max Accumulation',
    method: 'maxDepth',
    hints: [
      {
        level: 1,
        title: 'Branch Depth Accumulation',
        text: 'The depth of a tree depends on the paths through its branches. How can knowing the maximum depth of each child subtree directly determine the depth of the parent node?'
      },
      {
        level: 2,
        title: 'Bottom-Up Height Recurrence',
        text: 'The maximum depth of any node is 1 plus the maximum of the depths of its left and right subtrees.'
      },
      {
        level: 3,
        title: 'Post-Order Depth Calculation',
        text: 'Base case: if the node is null, return 0. Compute the depth of the left subtree and the depth of the right subtree. Return 1 plus the larger of the two depths.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(H)',
      variables: ['N: number of nodes in tree (0 <= N <= 10^4)', 'H: height of tree (log N balanced, N skewed)'],
      notes: 'Visits each node once in post-order. Call stack height equals the depth of the tree.',
      whyNaiveFails: 'Generating all root-to-leaf paths explicitly requires extra memory and string/array copying taking O(N * H) time.',
      spaceTimeTradeoff: 'Post-order divide and conquer computes subtree depths in a single bottom-up traversal taking O(N) time and O(H) auxiliary space.',
      interviewerExpectation: 'Handling null root cleanly returning 0, recursive recurrence 1 + max(left, right), awareness of recursion stack depth on skewed trees.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
        approach: 'Divide and Conquer Subtree Maximum',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <algorithm>

using namespace std;

class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`,
        approach: 'Post-Order Height Recursion',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
        approach: 'Recursive Height Accumulation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};`,
        approach: 'Divide and Conquer Height Evaluation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'diameter-of-binary-tree',
    number: 543,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    twist_type: 'Longest Path Split at Node Invariant',
    method: 'diameterOfBinaryTree',
    hints: [
      {
        level: 1,
        title: 'Arbitrary Path Highest Point',
        text: 'The longest path between any two nodes in a tree might not pass through the root. How can you calculate the path length through every node as a potential highest point in a single traversal?'
      },
      {
        level: 2,
        title: 'Local Path Length Invariant',
        text: 'The longest path passing through any specific node equals the depth of its left subtree plus the depth of its right subtree.'
      },
      {
        level: 3,
        title: 'Simultaneous Depth and Diameter Update',
        text: 'Maintain a running maximum diameter initialized to 0. In a helper function, compute the depth of the left and right subtrees. Update the maximum diameter with left_depth + right_depth. Return 1 + max(left_depth, right_depth) to the parent caller.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        max_d = 0
        def depth(node):
            nonlocal max_d
            if not node:
                return 0
            left = depth(node.left)
            right = depth(node.right)
            max_d = max(max_d, left + right)
            return 1 + max(left, right)
        depth(root)
        return max_d
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(H)',
      variables: ['N: number of nodes in tree (1 <= N <= 10^4)', 'H: tree height (log N balanced, N skewed)'],
      notes: 'Every node is visited once, updating the global diameter at each node.',
      whyNaiveFails: 'Calculating depth separately for every node in a top-down manner results in repeated visits, yielding O(N^2) time on degenerate trees.',
      spaceTimeTradeoff: 'Bottom-up post-order traversal computes depth and updates the global diameter simultaneously in O(N) time and O(H) space.',
      interviewerExpectation: 'Distinguishing between the value returned to the parent (height) and the value updating the global diameter (left_height + right_height), counting edges rather than nodes.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        max_d = 0
        def depth(node):
            nonlocal max_d
            if not node:
                return 0
            left = depth(node.left)
            right = depth(node.right)
            max_d = max(max_d, left + right)
            return 1 + max(left, right)
        depth(root)
        return max_d`,
        approach: 'Bottom-Up Height with Running Diameter Tracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <algorithm>

using namespace std;

class Solution {
private:
    int maxD = 0;
    int depth(TreeNode* node) {
        if (!node) return 0;
        int left = depth(node->left);
        int right = depth(node->right);
        maxD = max(maxD, left + right);
        return 1 + max(left, right);
    }
public:
    int diameterOfBinaryTree(TreeNode* root) {
        maxD = 0;
        depth(root);
        return maxD;
    }
};`,
        approach: 'Single-Pass Post-Order Height Accumulator',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    private int maxDiameter = 0;

    private int depth(TreeNode node) {
        if (node == null) return 0;
        int left = depth(node.left);
        int right = depth(node.right);
        maxDiameter = Math.max(maxDiameter, left + right);
        return 1 + Math.max(left, right);
    }

    public int diameterOfBinaryTree(TreeNode root) {
        maxDiameter = 0;
        depth(root);
        return maxDiameter;
    }
}`,
        approach: 'Bottom-Up Subtree Depth with Global Invariant',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
    let maxD = 0;
    function depth(node) {
        if (!node) return 0;
        const left = depth(node.left);
        const right = depth(node.right);
        maxD = Math.max(maxD, left + right);
        return 1 + Math.max(left, right);
    }
    depth(root);
    return maxD;
};`,
        approach: 'Closure-Based Post-Order Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'balanced-binary-tree',
    number: 110,
    category: 'Algorithms',
    patterns: ['tree-dfs-subproblem'],
    twist_type: 'Bottom-Up Height Invariant with -1 Sentinel',
    method: 'isBalanced',
    hints: [
      {
        level: 1,
        title: 'Redundant Height Check Avoidance',
        text: 'Checking whether left and right subtree heights differ by more than one for every node top-down results in repeated height calculations. How can you combine height calculation and balance validation in a single bottom-up pass?'
      },
      {
        level: 2,
        title: 'Sentinel Error Propagation',
        text: 'Return the height if a subtree is balanced, or a sentinel value like -1 as soon as an imbalance is detected anywhere in the subtree.'
      },
      {
        level: 3,
        title: 'Bottom-Up Height and Balance Procedure',
        text: 'Define a helper function returning the height of a node. If the node is null, return 0. Recursively get left and right heights. If either returns -1, or if the absolute difference between them exceeds 1, return -1. Otherwise, return 1 + max(left, right). Check if the root returns non-negative.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def check(node):
            if not node:
                return 0
            left = check(node.left)
            if left == -1:
                return -1
            right = check(node.right)
            if right == -1:
                return -1
            if abs(left - right) > 1:
                return -1
            return 1 + max(left, right)
        return check(root) != -1
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(H)',
      variables: ['N: number of nodes in tree (0 <= N <= 5000)', 'H: tree height (log N balanced, N skewed)'],
      notes: 'Visits each node at most once with early termination when imbalance is detected.',
      whyNaiveFails: 'Computing height at every node independently takes O(N^2) time on unbalanced trees because child nodes are re-traversed repeatedly by their ancestors.',
      spaceTimeTradeoff: 'Returning -1 upon detecting imbalance short-circuits evaluation in O(N) linear time and O(H) space.',
      interviewerExpectation: 'Avoiding O(N^2) top-down height checks, implementing early exit with sentinel -1, and clear base cases.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def check(node):
            if not node:
                return 0
            left = check(node.left)
            if left == -1:
                return -1
            right = check(node.right)
            if right == -1:
                return -1
            if abs(left - right) > 1:
                return -1
            return 1 + max(left, right)
        return check(root) != -1`,
        approach: 'Bottom-Up Height Check with Sentinel -1',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <algorithm>
#include <cmath>

using namespace std;

class Solution {
private:
    int check(TreeNode* node) {
        if (!node) return 0;
        int left = check(node->left);
        if (left == -1) return -1;
        int right = check(node->right);
        if (right == -1) return -1;
        if (abs(left - right) > 1) return -1;
        return 1 + max(left, right);
    }
public:
    bool isBalanced(TreeNode* root) {
        return check(root) != -1;
    }
};`,
        approach: 'Single-Pass Height with Sentinel Early Exit',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    private int check(TreeNode node) {
        if (node == null) return 0;
        int left = check(node.left);
        if (left == -1) return -1;
        int right = check(node.right);
        if (right == -1) return -1;
        if (Math.abs(left - right) > 1) return -1;
        return 1 + Math.max(left, right);
    }

    public boolean isBalanced(TreeNode root) {
        return check(root) != -1;
    }
}`,
        approach: 'Bottom-Up Height and Balance Sentinel',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    function check(node) {
        if (!node) return 0;
        const left = check(node.left);
        if (left === -1) return -1;
        const right = check(node.right);
        if (right === -1) return -1;
        if (Math.abs(left - right) > 1) return -1;
        return 1 + Math.max(left, right);
    }
    return check(root) !== -1;
};`,
        approach: 'Post-Order Height Evaluation with Sentinel -1',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'lowest-common-ancestor-of-a-binary-search-tree',
    number: 235,
    category: 'Algorithms',
    patterns: ['tree-bst-properties'],
    twist_type: 'BST Value Split Invariant',
    method: 'lowestCommonAncestor',
    hints: [
      {
        level: 1,
        title: 'Ordered Tree Split Direction',
        text: 'In an ordered tree where every left descendant is strictly smaller and every right descendant is strictly larger, how can the values of p and q direct you toward their split point without searching both sides?'
      },
      {
        level: 2,
        title: 'Bifurcation Point Invariant',
        text: 'If both target values are smaller than the current node, their lowest common ancestor must lie to the left. If both are larger, it lies to the right. If they split on either side, the current node is the answer.'
      },
      {
        level: 3,
        title: 'Iterative Descent to Split Node',
        text: 'Start at the root. While the current node is not null, compare its value with p and q. If both p.val and q.val are strictly less than curr.val, move curr to curr.left. If both are strictly greater, move curr to curr.right. Otherwise, curr is the split node, so return curr.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        curr = root
        while curr:
            if p.val < curr.val and q.val < curr.val:
                curr = curr.left
            elif p.val > curr.val and q.val > curr.val:
                curr = curr.right
            else:
                return curr
        return None
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(H)',
      space: 'O(1)',
      variables: ['H: height of binary search tree (log N balanced, N skewed)'],
      notes: 'Follows a single path from root to the lowest common ancestor in O(1) space.',
      whyNaiveFails: 'Generic tree LCA algorithms store node paths or traverse both subtrees, requiring O(N) time and O(N) space regardless of the sorted invariant.',
      spaceTimeTradeoff: 'Exploiting the BST ordering property allows a direct iterative descent in O(H) time and strictly O(1) space.',
      interviewerExpectation: 'Direct iterative traversal with O(1) space, identifying the split condition min(p, q) <= curr.val <= max(p, q), handling when p or q is itself the ancestor.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        curr = root
        while curr:
            if p.val < curr.val and q.val < curr.val:
                curr = curr.left
            elif p.val > curr.val and q.val > curr.val:
                curr = curr.right
            else:
                return curr
        return None`,
        approach: 'Iterative Split Invariant Search in O(1) Space',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        TreeNode* curr = root;
        while (curr) {
            if (p->val < curr->val && q->val < curr->val) {
                curr = curr->left;
            } else if (p->val > curr->val && q->val > curr->val) {
                curr = curr->right;
            } else {
                return curr;
            }
        }
        return nullptr;
    }
};`,
        approach: 'Iterative BST Descent with Pointer Steering',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode curr = root;
        while (curr != null) {
            if (p.val < curr.val && q.val < curr.val) {
                curr = curr.left;
            } else if (p.val > curr.val && q.val > curr.val) {
                curr = curr.right;
            } else {
                return curr;
            }
        }
        return null;
    }
}`,
        approach: 'Iterative BST Split Node Discovery',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    let curr = root;
    while (curr) {
        if (p.val < curr.val && q.val < curr.val) {
            curr = curr.left;
        } else if (p.val > curr.val && q.val > curr.val) {
            curr = curr.right;
        } else {
            return curr;
        }
    }
    return null;
};`,
        approach: 'BST Directional Invariant Iteration',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'binary-tree-level-order-traversal',
    number: 102,
    category: 'Algorithms',
    patterns: ['tree-bfs-level-order'],
    twist_type: 'FIFO Level Snapshot Processing',
    method: 'levelOrder',
    hints: [
      {
        level: 1,
        title: 'Horizontal Level Partitioning',
        text: 'Visiting nodes row by row from top to bottom requires remembering children to inspect on the next level. How can you group nodes strictly by their depth level?'
      },
      {
        level: 2,
        title: 'Buffer Snapshot Invariant',
        text: 'Processing all nodes currently in a first-in first-out buffer corresponds to one entire horizontal level before any of their children are processed.'
      },
      {
        level: 3,
        title: 'Level by Level Collection Procedure',
        text: 'If root is null, return an empty list. Initialize a list of current level nodes starting with root. While the current level is not empty, collect the values of all nodes in this level, gather their non-null left and right children into the next level list, and append the values to the result.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> list[list[int]]:
        if not root:
            return []
        res = []
        level = [root]
        while level:
            res.append([node.val for node in level])
            next_level = []
            for node in level:
                if node.left:
                    next_level.append(node.left)
                if node.right:
                    next_level.append(node.right)
            level = next_level
        return res
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(W)',
      variables: ['N: number of nodes in tree (0 <= N <= 2000)', 'W: maximum width of tree (up to N/2)'],
      notes: 'Each node is visited once and grouped into its horizontal layer.',
      whyNaiveFails: 'Recursively searching for nodes at depth d for d = 0, 1, 2... requires O(N * H) time due to scanning the tree repeatedly.',
      spaceTimeTradeoff: 'Maintaining level buffers captures each level in a single pass taking O(N) time and O(W) auxiliary space.',
      interviewerExpectation: 'Clean snapshot of level length or two-array level swap, null root handling, and ordering guarantees from left to right.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> list[list[int]]:
        if not root:
            return []
        res = []
        level = [root]
        while level:
            res.append([node.val for node in level])
            next_level = []
            for node in level:
                if node.left:
                    next_level.append(node.left)
                if node.right:
                    next_level.append(node.right)
            level = next_level
        return res`,
        approach: 'Level Array Swapping BFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>
#include <queue>

using namespace std;

class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int sz = q.size();
            vector<int> level;
            for (int i = 0; i < sz; i++) {
                TreeNode* node = q.front();
                q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(level);
        }
        return res;
    }
};`,
        approach: 'Queue Size Snapshot BFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.ArrayList;
import java.util.ArrayDeque;
import java.util.List;
import java.util.Queue;

class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        Queue<TreeNode> q = new ArrayDeque<>();
        q.offer(root);
        while (!q.isEmpty()) {
            int sz = q.size();
            List<Integer> level = new ArrayList<>(sz);
            for (int i = 0; i < sz; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null) q.offer(node.left);
                if (node.right != null) q.offer(node.right);
            }
            res.add(level);
        }
        return res;
    }
}`,
        approach: 'FIFO Queue Level Partitioning',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if (!root) return [];
    const res = [];
    let level = [root];
    while (level.length > 0) {
        res.push(level.map(n => n.val));
        const nextLevel = [];
        for (const node of level) {
            if (node.left) nextLevel.push(node.left);
            if (node.right) nextLevel.push(node.right);
        }
        level = nextLevel;
    }
    return res;
};`,
        approach: 'Level Array Iteration',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'validate-binary-search-tree',
    number: 98,
    category: 'Algorithms',
    patterns: ['tree-bst-properties'],
    twist_type: 'Valid Range Interval Propagation (-inf, +inf)',
    method: 'isValidBST',
    hints: [
      {
        level: 1,
        title: 'Ancestor Range Constraint',
        text: 'Comparing a node only to its immediate left and right children is insufficient because all descendants in the left subtree must be smaller than every ancestor. How can you propagate allowable value boundaries downward?'
      },
      {
        level: 2,
        title: 'Narrowing Interval Invariant',
        text: 'Every node in a valid search tree must satisfy a strict range low < val < high, which narrows as you traverse down each branch.'
      },
      {
        level: 3,
        title: 'Recursive Range Propagation Procedure',
        text: 'Define a helper function taking a node, low bound, and high bound, initialized to negative and positive infinity. If the node is null, return true. If node.val <= low or node.val >= high, return false. Recursively validate left with (low, node.val) and right with (node.val, high).'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def validate(node, low, high):
            if not node:
                return True
            if not (low < node.val < high):
                return False
            return validate(node.left, low, node.val) and validate(node.right, node.val, high)
        return validate(root, float('-inf'), float('inf'))
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(H)',
      variables: ['N: number of nodes in tree (1 <= N <= 10^4)', 'H: tree height (log N balanced, N skewed)'],
      notes: 'Single pass checking each node against its inherited upper and lower bounds.',
      whyNaiveFails: 'Checking only immediate children (e.g. node.left.val < node.val < node.right.val) fails on trees like [5, 1, 4, null, null, 3, 6] where 3 is in the right subtree of 5.',
      spaceTimeTradeoff: 'Propagating upper and lower bounds checks each node once in O(N) time and O(H) auxiliary space without building an auxiliary array.',
      interviewerExpectation: 'Using open intervals (strict inequalities), handling 32-bit integer boundary values (e.g. INT_MIN and INT_MAX) using infinity or 64-bit bounds, and understanding alternative in-order traversal approach.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def validate(node, low, high):
            if not node:
                return True
            if not (low < node.val < high):
                return False
            return validate(node.left, low, node.val) and validate(node.right, node.val, high)
        return validate(root, float('-inf'), float('inf'))`,
        approach: 'Upper and Lower Bound Interval Propagation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <climits>

class Solution {
private:
    bool validate(TreeNode* node, long long low, long long high) {
        if (!node) return true;
        if (node->val <= low || node->val >= high) return false;
        return validate(node->left, low, node->val) && validate(node->right, node->val, high);
    }
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, LLONG_MIN, LLONG_MAX);
    }
};`,
        approach: '64-Bit Range Interval Propagation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    private boolean validate(TreeNode node, Long low, Long high) {
        if (node == null) return true;
        if ((low != null && node.val <= low) || (high != null && node.val >= high)) {
            return false;
        }
        return validate(node.left, low, (long) node.val) && validate(node.right, (long) node.val, high);
    }

    public boolean isValidBST(TreeNode root) {
        return validate(root, null, null);
    }
}`,
        approach: 'Nullable Long Bound Invariant Propagation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    function validate(node, low, high) {
        if (!node) return true;
        if (node.val <= low || node.val >= high) return false;
        return validate(node.left, low, node.val) && validate(node.right, node.val, high);
    }
    return validate(root, -Infinity, Infinity);
};`,
        approach: 'Infinite Boundary Interval Recursion',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'kth-smallest-element-in-a-bst',
    number: 230,
    category: 'Algorithms',
    patterns: ['tree-bst-properties'],
    twist_type: 'In-Order Traversal with Early K Counter Stop',
    method: 'kthSmallest',
    hints: [
      {
        level: 1,
        title: 'Ordered Traversal Sequence',
        text: 'Sorting all node values takes extra time and space. What traversal order visits the values of an ordered binary tree in strictly increasing sequence?'
      },
      {
        level: 2,
        title: 'In-Order Ascending Invariant',
        text: 'An in-order traversal (left child, current node, right child) visits nodes in strictly ascending sorted order. The kth node visited is the answer.'
      },
      {
        level: 3,
        title: 'Early Stopping In-Order Procedure',
        text: 'Traverse in-order iteratively or recursively while decrementing a counter k for each visited node. When k reaches 0, the current node value is the answer, so stop further traversal and return it.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []
        curr = root
        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack.pop()
            k -= 1
            if k == 0:
                return curr.val
            curr = curr.right
        return -1
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(H + k)',
      space: 'O(H)',
      variables: ['H: tree height (log N balanced, N skewed)', 'k: target rank (1 <= k <= N)'],
      notes: 'Terminates immediately upon popping the kth smallest element from the in-order stack.',
      whyNaiveFails: 'Collecting all nodes into an array and sorting takes O(N log N) time and O(N) space, ignoring the sorted BST structure.',
      spaceTimeTradeoff: 'Stopping in-order traversal as soon as k elements are visited takes O(H + k) time and O(H) space, avoiding traversing the remainder of the tree.',
      interviewerExpectation: 'Halting traversal immediately upon reaching the kth element, iterative stack or clean stateful traversal, and discussion of augmenting nodes with subtree sizes for frequent queries.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []
        curr = root
        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left
            curr = stack.pop()
            k -= 1
            if k == 0:
                return curr.val
            curr = curr.right
        return -1`,
        approach: 'Iterative In-Order Stack with Early Exit',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <stack>

using namespace std;

class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode*> s;
        TreeNode* curr = root;
        while (curr || !s.empty()) {
            while (curr) {
                s.push(curr);
                curr = curr->left;
            }
            curr = s.top();
            s.pop();
            k--;
            if (k == 0) return curr->val;
            curr = curr->right;
        }
        return -1;
    }
};`,
        approach: 'Iterative In-Order Stack Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    public int kthSmallest(TreeNode root, int k) {
        Deque<TreeNode> stack = new ArrayDeque<>();
        TreeNode curr = root;
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            k--;
            if (k == 0) return curr.val;
            curr = curr.right;
        }
        return -1;
    }
}`,
        approach: 'In-Order Traversal with Counter Decrement',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    const stack = [];
    let curr = root;
    while (curr || stack.length > 0) {
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        k--;
        if (k === 0) return curr.val;
        curr = curr.right;
    }
    return -1;
};`,
        approach: 'Iterative Stack In-Order Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'implement-trie-prefix-tree',
    number: 208,
    category: 'Algorithms',
    patterns: ['tree-trie-prefix'],
    twist_type: 'Character Node Tree with Terminal Flag',
    method: 'Trie',
    hints: [
      {
        level: 1,
        title: 'Prefix Path Sharing Obstacle',
        text: 'Searching a list of words for prefixes takes time proportional to the number of words. How can words sharing common prefixes share common tree paths to make prefix lookups independent of dictionary size?'
      },
      {
        level: 2,
        title: 'Character Node Branching',
        text: 'Each node in the tree represents a single character and branches into subsequent characters, with a marker indicating where complete words terminate.'
      },
      {
        level: 3,
        title: 'Prefix Tree Node Traversal Procedure',
        text: 'Each node maintains a map of character to child node and a boolean flag is_end. To insert, traverse characters creating new nodes as needed, setting is_end on the last. To search, follow characters; return true if path exists and is_end is true. For startsWith, return true if the character path exists.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
        curr.is_end = True

    def search(self, word: str) -> bool:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                return False
            curr = curr.children[ch]
        return curr.is_end

    def startsWith(self, prefix: str) -> bool:
        curr = self.root
        for ch in prefix:
            if ch not in curr.children:
                return False
            curr = curr.children[ch]
        return True
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(L)',
      space: 'O(T * ALPHABET)',
      variables: ['L: length of query word or prefix (1 <= L <= 2000)', 'T: total characters across all inserted words'],
      notes: 'All operations insert, search, and startsWith run in strictly O(L) time.',
      whyNaiveFails: 'Checking prefixes against a hash set of words requires scanning every word, taking O(N * L) time which is too slow for large word lists.',
      spaceTimeTradeoff: 'Sharing common prefixes among words compresses prefix storage and guarantees O(L) time per query independent of total word count.',
      interviewerExpectation: 'Clear node representation (array of size 26 or dictionary), correct distinction between search (requires is_end) and startsWith (only requires prefix path), and constant-time per character transitions.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
        curr.is_end = True

    def search(self, word: str) -> bool:
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                return False
            curr = curr.children[ch]
        return curr.is_end

    def startsWith(self, prefix: str) -> bool:
        curr = self.root
        for ch in prefix:
            if ch not in curr.children:
                return False
            curr = curr.children[ch]
        return True`,
        approach: 'Dict-Based Trie Node Tree',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <string>
#include <unordered_map>

using namespace std;

class Trie {
private:
    struct TrieNode {
        unordered_map<char, TrieNode*> children;
        bool is_end = false;
    };
    TrieNode* root;
public:
    Trie() {
        root = new TrieNode();
    }
    
    void insert(string word) {
        TrieNode* curr = root;
        for (char ch : word) {
            if (!curr->children.count(ch)) {
                curr->children[ch] = new TrieNode();
            }
            curr = curr->children[ch];
        }
        curr->is_end = true;
    }
    
    bool search(string word) {
        TrieNode* curr = root;
        for (char ch : word) {
            if (!curr->children.count(ch)) return false;
            curr = curr->children[ch];
        }
        return curr->is_end;
    }
    
    bool startsWith(string prefix) {
        TrieNode* curr = root;
        for (char ch : prefix) {
            if (!curr->children.count(ch)) return false;
            curr = curr->children[ch];
        }
        return true;
    }
};`,
        approach: 'Unordered Map Prefix Tree Nodes',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.HashMap;
import java.util.Map;

class Trie {
    private static class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        boolean isEnd = false;
    }

    private final TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode curr = root;
        for (char ch : word.toCharArray()) {
            curr.children.putIfAbsent(ch, new TrieNode());
            curr = curr.children.get(ch);
        }
        curr.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode curr = root;
        for (char ch : word.toCharArray()) {
            if (!curr.children.containsKey(ch)) return false;
            curr = curr.children.get(ch);
        }
        return curr.isEnd;
    }

    public boolean startsWith(String prefix) {
        TrieNode curr = root;
        for (char ch : prefix.toCharArray()) {
            if (!curr.children.containsKey(ch)) return false;
            curr = curr.children.get(ch);
        }
        return true;
    }
}`,
        approach: 'HashMap Node Prefix Tree Structure',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `var Trie = function() {
    this.root = { children: {}, isEnd: false };
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let curr = this.root;
    for (const ch of word) {
        if (!curr.children[ch]) {
            curr.children[ch] = { children: {}, isEnd: false };
        }
        curr = curr.children[ch];
    }
    curr.isEnd = true;
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    let curr = this.root;
    for (const ch of word) {
        if (!curr.children[ch]) return false;
        curr = curr.children[ch];
    }
    return curr.isEnd;
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    let curr = this.root;
    for (const ch of prefix) {
        if (!curr.children[ch]) return false;
        curr = curr.children[ch];
    }
    return true;
};`,
        approach: 'Object Prototype Prefix Tree',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'kth-largest-element-in-an-array',
    number: 215,
    category: 'Algorithms',
    patterns: ['heap-top-k-elements'],
    twist_type: 'Min-Heap of Size K over Elements',
    method: 'findKthLargest',
    hints: [
      {
        level: 1,
        title: 'Full Sorting Overhead',
        text: 'Sorting the entire array takes superlinear time. If you only need the kth largest value, how can you maintain only the k largest candidates seen so far as you stream through elements?'
      },
      {
        level: 2,
        title: 'Top K Smallest Boundary Invariant',
        text: 'If a collection maintains the k largest numbers observed, its smallest member is always the kth largest element overall.'
      },
      {
        level: 3,
        title: 'Bounded Collection Maintenance Procedure',
        text: 'Use a min-oriented priority structure of fixed capacity k. For each number in the array, insert it. If the size exceeds k, remove the smallest element. After processing all numbers, the top of the collection is the kth largest value.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
import heapq

class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        heap = []
        for num in nums:
            heapq.heappush(heap, num)
            if len(heap) > k:
                heapq.heappop(heap)
        return heap[0]
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N log k)',
      space: 'O(k)',
      variables: ['N: length of nums array (1 <= N <= 10^5)', 'k: target rank (1 <= k <= N)'],
      notes: 'Maintains a min-heap of size at most k+1 across all N elements.',
      whyNaiveFails: 'Full sorting takes O(N log N) time and O(N) space. For large arrays with small k, sorting the whole array does redundant work.',
      spaceTimeTradeoff: 'Maintaining a structure of size k achieves O(N log k) time and O(k) auxiliary space, which outperforms full sort when k << N.',
      interviewerExpectation: 'Explanation of why a min-oriented collection of size k yields the kth largest element at its top, comparison with Quickselect O(N) average time, and handling duplicate numbers.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import heapq

class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        heap = []
        for num in nums:
            heapq.heappush(heap, num)
            if len(heap) > k:
                heapq.heappop(heap)
        return heap[0]`,
        approach: 'Min-Heap of Size K with Streaming Eviction',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>
#include <queue>

using namespace std;

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (int num : nums) {
            minHeap.push(num);
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        return minHeap.top();
    }
};`,
        approach: 'Fixed-Capacity Greater-Than Min-Heap',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.PriorityQueue;

class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        return minHeap.peek();
    }
}`,
        approach: 'Java PriorityQueue Size-K Window',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    nums.sort((a, b) => b - a);
    return nums[k - 1];
};`,
        approach: 'Optimized In-Place Sort Selection',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'find-median-from-data-stream',
    number: 295,
    category: 'Algorithms',
    patterns: ['heap-two-heaps-median'],
    twist_type: 'Max-Heap and Min-Heap Balance Invariant',
    method: 'MedianFinder',
    hints: [
      {
        level: 1,
        title: 'Dynamic Median Shift Overhead',
        text: 'Keeping a list sorted upon every insertion takes linear time due to shifting elements. How can dividing numbers into smaller and larger halves allow reading the median from the boundary in constant time?'
      },
      {
        level: 2,
        title: 'Two Halves Balance Invariant',
        text: 'The median lies at the boundary between the lower half of numbers and the upper half. Keeping both halves balanced in size lets you read the median in constant time.'
      },
      {
        level: 3,
        title: 'Two Heaps Balancing Procedure',
        text: 'Maintain two priority collections: a max-oriented collection for the lower half and a min-oriented collection for the upper half. Push incoming numbers into the lower half, then move its maximum to the upper half. If the upper half has more elements than the lower half, transfer its minimum back. The median is either the top of the lower half or the average of both tops.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap
        self.large = []  # min-heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(log N)',
      space: 'O(N)',
      variables: ['N: total number of added numbers (up to 5 * 10^4)'],
      notes: 'addNum runs in O(log N) heap time; findMedian runs in strictly O(1) time.',
      whyNaiveFails: 'Inserting into a sorted array takes O(N) time per insertion due to element shifts, leading to O(N^2) total time for N insertions (TLE for N = 5 * 10^4).',
      spaceTimeTradeoff: 'Splitting elements across two balanced halves takes O(log N) per insertion and delivers O(1) median queries with O(N) storage.',
      interviewerExpectation: 'Invariant maintenance: lower half size is either equal to or one greater than upper half size, max of lower half <= min of upper half, correct float division when total elements is even.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # max-heap
        self.large = []  # min-heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0`,
        approach: 'Two Balanced Heaps (Max-Heap Small, Min-Heap Large)',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <queue>
#include <vector>

using namespace std;

class MedianFinder {
private:
    priority_queue<int> small; // max-heap
    priority_queue<int, vector<int>, greater<int>> large; // min-heap
public:
    MedianFinder() {}
    
    void addNum(int num) {
        small.push(num);
        large.push(small.top());
        small.pop();
        if (large.size() > small.size()) {
            small.push(large.top());
            large.pop();
        }
    }
    
    double findMedian() {
        if (small.size() > large.size()) {
            return (double)small.top();
        }
        return ((double)small.top() + (double)large.top()) / 2.0;
    }
};`,
        approach: 'Dual Priority Queue Balanced Boundary',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.Collections;
import java.util.PriorityQueue;

class MedianFinder {
    private PriorityQueue<Integer> small;
    private PriorityQueue<Integer> large;

    public MedianFinder() {
        small = new PriorityQueue<>(Collections.reverseOrder());
        large = new PriorityQueue<>();
    }

    public void addNum(int num) {
        small.offer(num);
        large.offer(small.poll());
        if (large.size() > small.size()) {
            small.offer(large.poll());
        }
    }

    public double findMedian() {
        if (small.size() > large.size()) {
            return (double) small.peek();
        }
        return ((double) small.peek() + (double) large.peek()) / 2.0;
    }
}`,
        approach: 'Two Heaps with Rebalancing',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `var MedianFinder = function() {
    this.arr = [];
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    let low = 0, high = this.arr.length;
    while (low < high) {
        const mid = (low + high) >> 1;
        if (this.arr[mid] < num) low = mid + 1;
        else high = mid;
    }
    this.arr.splice(low, 0, num);
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    const n = this.arr.length;
    const mid = Math.floor(n / 2);
    if (n % 2 === 1) return this.arr[mid];
    return (this.arr[mid - 1] + this.arr[mid]) / 2;
};`,
        approach: 'Binary Search Insertion with Array Splice',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'subsets',
    number: 78,
    category: 'Algorithms',
    patterns: ['backtracking-subsets-perm'],
    twist_type: 'Include-Exclude State Tree Branching',
    method: 'subsets',
    hints: [
      {
        level: 1,
        title: 'Binary Decision Tree Obstacle',
        text: 'Every element in an array has two choices for any given subset: it is either included or excluded. How can systematic branching explore all combinations without duplicate subsets?'
      },
      {
        level: 2,
        title: 'Prefix Expansion Invariant',
        text: 'Generate combinations by deciding whether to include each element at each index, or by expanding partial subsets from a starting index forward.'
      },
      {
        level: 3,
        title: 'State Tree Backtracking Procedure',
        text: 'Initialize an empty result list. Define a recursive exploration function taking the current index and current path. At each step, append a copy of the current path to the result. Then loop through candidate indices from the current index to the end, append nums[i] to path, recurse with i + 1, and pop from path to revert state.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        res = []
        path = []
        def backtrack(start):
            res.append(list(path))
            for i in range(start, len(nums)):
                path.append(nums[i])
                backtrack(i + 1)
                path.pop()
        backtrack(0)
        return res
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N * 2^N)',
      space: 'O(N)',
      variables: ['N: length of nums array (1 <= N <= 10)'],
      notes: 'Produces all 2^N subsets, each of average length N/2.',
      whyNaiveFails: 'Generating all 2^N subsets cannot be done faster than O(2^N) because 2^N distinct subsets must be produced.',
      spaceTimeTradeoff: 'In-place path modification uses O(N) call stack and path memory instead of copying arrays at every branch.',
      interviewerExpectation: 'Clean state restoration (push and pop), copy creation when storing into result (path[:] or list(path)), understanding the 2^N state tree size.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def subsets(self, nums: list[int]) -> list[list[int]]:
        res = []
        path = []
        def backtrack(start):
            res.append(list(path))
            for i in range(start, len(nums)):
                path.append(nums[i])
                backtrack(i + 1)
                path.pop()
        backtrack(0)
        return res`,
        approach: 'Backtracking State Tree with In-Place Push/Pop',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>

using namespace std;

class Solution {
private:
    void backtrack(int start, vector<int>& nums, vector<int>& path, vector<vector<int>>& res) {
        res.push_back(path);
        for (int i = start; i < (int)nums.size(); i++) {
            path.push_back(nums[i]);
            backtrack(i + 1, nums, path, res);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        backtrack(0, nums, path, res);
        return res;
    }
};`,
        approach: 'Recursive Depth-First Path Exploration',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.ArrayList;
import java.util.List;

class Solution {
    private void backtrack(int start, int[] nums, List<Integer> path, List<List<Integer>> res) {
        res.add(new ArrayList<>(path));
        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);
            backtrack(i + 1, nums, path, res);
            path.remove(path.size() - 1);
        }
    }

    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(0, nums, new ArrayList<>(), res);
        return res;
    }
}`,
        approach: 'Backtracking with Path Copying',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    const res = [];
    const path = [];
    function backtrack(start) {
        res.push([...path]);
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1);
            path.pop();
        }
    }
    backtrack(0);
    return res;
};`,
        approach: 'Array State Backtracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'combination-sum',
    number: 39,
    category: 'Algorithms',
    patterns: ['backtracking-subsets-perm'],
    twist_type: 'Unbounded Candidate Reuse with Remaining Sum Pruning',
    method: 'combinationSum',
    hints: [
      {
        level: 1,
        title: 'Unbounded Reuse Without Duplicate Permutations',
        text: 'The same number may be chosen an unlimited number of times to reach a target sum. How can you explore repeated choices without generating duplicate permutations like [2, 3] and [3, 2]?'
      },
      {
        level: 2,
        title: 'Forward Index Restriction Invariant',
        text: 'Restricting candidate choices to the current index and forward prevents permutations of the same combination from being generated again.'
      },
      {
        level: 3,
        title: 'Target Pruning Backtracking Procedure',
        text: 'Define a recursive search function with the remaining target, current combination path, and start index. If remaining target is 0, add a copy of path to results and return. If remaining target is negative, return. Otherwise, iterate through candidates from start index to end: append candidate, recurse with remaining target minus candidate keeping the same start index i, and pop to backtrack.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        res = []
        path = []
        def backtrack(remain, start):
            if remain == 0:
                res.append(list(path))
                return
            if remain < 0:
                return
            for i in range(start, len(candidates)):
                path.append(candidates[i])
                backtrack(remain - candidates[i], i)
                path.pop()
        backtrack(target, 0)
        return res
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N^(T/M))',
      space: 'O(T/M)',
      variables: ['T: target value (1 <= T <= 40)', 'M: minimum candidate value (2 <= M <= 40)', 'N: number of candidates (1 <= N <= 30)'],
      notes: 'Branching tree has max depth T/M and branching factor up to N.',
      whyNaiveFails: 'Trying all combinations without index ordering generates duplicate permutations of identical combinations, requiring expensive post-filtering.',
      spaceTimeTradeoff: 'Sorting candidates enables early pruning when candidate > remaining target, reducing explored branches with O(T/M) stack space.',
      interviewerExpectation: 'Pruning when remaining < 0, passing index i (not i + 1) to allow reuse while preventing duplicate permutations, clean backtracking undo step.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        res = []
        path = []
        def backtrack(remain, start):
            if remain == 0:
                res.append(list(path))
                return
            if remain < 0:
                return
            for i in range(start, len(candidates)):
                path.append(candidates[i])
                backtrack(remain - candidates[i], i)
                path.pop()
        backtrack(target, 0)
        return res`,
        approach: 'Unbounded Index-Restricted Backtracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>

using namespace std;

class Solution {
private:
    void backtrack(int remain, int start, vector<int>& candidates, vector<int>& path, vector<vector<int>>& res) {
        if (remain == 0) {
            res.push_back(path);
            return;
        }
        if (remain < 0) return;
        for (int i = start; i < (int)candidates.size(); i++) {
            path.push_back(candidates[i]);
            backtrack(remain - candidates[i], i, candidates, path, res);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> path;
        backtrack(target, 0, candidates, path, res);
        return res;
    }
};`,
        approach: 'Remaining Target Pruned Search',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.ArrayList;
import java.util.List;

class Solution {
    private void backtrack(int remain, int start, int[] candidates, List<Integer> path, List<List<Integer>> res) {
        if (remain == 0) {
            res.add(new ArrayList<>(path));
            return;
        }
        if (remain < 0) return;
        for (int i = start; i < candidates.length; i++) {
            path.add(candidates[i]);
            backtrack(remain - candidates[i], i, candidates, path, res);
            path.remove(path.size() - 1);
        }
    }

    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(target, 0, candidates, new ArrayList<>(), res);
        return res;
    }
}`,
        approach: 'Unbounded Recursive Candidate Traversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const res = [];
    const path = [];
    function backtrack(remain, start) {
        if (remain === 0) {
            res.push([...path]);
            return;
        }
        if (remain < 0) return;
        for (let i = start; i < candidates.length; i++) {
            path.push(candidates[i]);
            backtrack(remain - candidates[i], i);
            path.pop();
        }
    }
    backtrack(target, 0);
    return res;
};`,
        approach: 'Target Decrement Backtracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'permutations',
    number: 46,
    category: 'Algorithms',
    patterns: ['backtracking-subsets-perm'],
    twist_type: 'Visited Set State Tree Branching',
    method: 'permute',
    hints: [
      {
        level: 1,
        title: 'Unique Element Placement Invariant',
        text: 'Unlike subsets where ordering does not matter, a permutation must include all elements in every possible order. How can you ensure each number appears exactly once in each candidate sequence?'
      },
      {
        level: 2,
        title: 'Unused Element Selection',
        text: 'At each step of constructing a sequence of length N, pick any element that has not yet been selected in the current path.'
      },
      {
        level: 3,
        title: 'State Restoration Permutation Procedure',
        text: 'Define a recursive helper that maintains the current path and a set or boolean array of used elements. If the path length equals the array length, append a copy of path to results. Otherwise, iterate through all elements: if an element is unused, mark it used, append to path, recurse, then unmark it and pop from path.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        res = []
        path = []
        used = [False] * len(nums)
        def backtrack():
            if len(path) == len(nums):
                res.append(list(path))
                return
            for i in range(len(nums)):
                if not used[i]:
                    used[i] = True
                    path.append(nums[i])
                    backtrack()
                    path.pop()
                    used[i] = False
        backtrack()
        return res
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N * N!)',
      space: 'O(N)',
      variables: ['N: length of nums array (1 <= N <= 6)'],
      notes: 'Produces exactly N! permutations of length N with O(N) recursion stack.',
      whyNaiveFails: 'Generating random shuffles or checking all N^N sequences and filtering takes O(N^N) time, which is vastly slower than N! exploration.',
      spaceTimeTradeoff: 'Tracking used elements in a boolean array or set explores only the exact N! valid permutations in O(N) auxiliary space.',
      interviewerExpectation: 'Explicit state restoration (push/pop and visited toggle), deep-copying paths when appending to results, understanding the N! factorial complexity.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        res = []
        path = []
        used = [False] * len(nums)
        def backtrack():
            if len(path) == len(nums):
                res.append(list(path))
                return
            for i in range(len(nums)):
                if not used[i]:
                    used[i] = True
                    path.append(nums[i])
                    backtrack()
                    path.pop()
                    used[i] = False
        backtrack()
        return res`,
        approach: 'Boolean Visited Array Backtracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>

using namespace std;

class Solution {
private:
    void backtrack(vector<int>& nums, vector<bool>& used, vector<int>& path, vector<vector<int>>& res) {
        if (path.size() == nums.size()) {
            res.push_back(path);
            return;
        }
        for (int i = 0; i < (int)nums.size(); i++) {
            if (!used[i]) {
                used[i] = true;
                path.push_back(nums[i]);
                backtrack(nums, used, path, res);
                path.pop_back();
                used[i] = false;
            }
        }
    }
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        vector<bool> used(nums.size(), false);
        backtrack(nums, used, path, res);
        return res;
    }
};`,
        approach: 'Boolean Vector State Tracking Backtracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `import java.util.ArrayList;
import java.util.List;

class Solution {
    private void backtrack(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> res) {
        if (path.size() == nums.length) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (!used[i]) {
                used[i] = true;
                path.add(nums[i]);
                backtrack(nums, used, path, res);
                path.remove(path.size() - 1);
                used[i] = false;
            }
        }
    }

    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, new boolean[nums.length], new ArrayList<>(), res);
        return res;
    }
}`,
        approach: 'Boolean Array Visited Tracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const res = [];
    const path = [];
    const used = new Array(nums.length).fill(false);
    function backtrack() {
        if (path.length === nums.length) {
            res.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (!used[i]) {
                used[i] = true;
                path.push(nums[i]);
                backtrack();
                path.pop();
                used[i] = false;
            }
        }
    }
    backtrack();
    return res;
};`,
        approach: 'Used Flag Array Permutation Generation',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  },
  {
    slug: 'word-search',
    number: 79,
    category: 'Algorithms',
    patterns: ['backtracking-grid-dfs'],
    twist_type: 'In-Place Grid Cell Visiting Sentinel (\'#\')',
    method: 'exist',
    hints: [
      {
        level: 1,
        title: 'Single-Use Cell Exploration',
        text: 'Finding a word on a grid requires moving to adjacent cells without reusing the same cell twice in the same word. How can you explore valid character paths while temporarily marking cells as visited?'
      },
      {
        level: 2,
        title: 'In-Place Sentinel Invariant',
        text: 'Temporarily overwrite the visited grid cell with a sentinel character like \'#\' during exploration, and restore its original character when returning.'
      },
      {
        level: 3,
        title: 'Orthogonal Backtracking Search Procedure',
        text: 'Iterate through all grid cells (r, c). When board[r][c] equals word[0], start a recursive search. At step k, check boundary limits and character match. If k equals len(word) - 1, return true. Mark board[r][c] with a sentinel, explore all four orthogonal neighbors with k + 1, and restore the original character before returning false.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: `\`\`\`python
class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        rows, cols = len(board), len(board[0])
        def dfs(r, c, k):
            if k == len(word):
                return True
            if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[k]:
                return False
            temp = board[r][c]
            board[r][c] = '#'
            found = (dfs(r + 1, c, k + 1) or
                     dfs(r - 1, c, k + 1) or
                     dfs(r, c + 1, k + 1) or
                     dfs(r, c - 1, k + 1))
            board[r][c] = temp
            return found
        for r in range(rows):
            for c in range(cols):
                if board[r][c] == word[0] and dfs(r, c, 0):
                    return True
        return False
\`\`\``
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(M * N * 3^L)',
      space: 'O(L)',
      variables: ['M: rows in board (1 <= M <= 6)', 'N: cols in board (1 <= N <= 6)', 'L: length of word (1 <= L <= 15)'],
      notes: 'Branching factor is 3 after the first step because the predecessor is blocked by the sentinel.',
      whyNaiveFails: 'Maintaining an auxiliary 2D visited array or set of coordinate tuples adds allocation overhead per step, whereas in-place modification uses zero extra space.',
      spaceTimeTradeoff: 'In-place cell mutation avoids O(M * N) memory allocations, using only O(L) call stack space.',
      interviewerExpectation: 'In-place grid marking and restoration, early boundary checks before accessing grid, short-circuiting as soon as a true path is found.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        rows, cols = len(board), len(board[0])
        def dfs(r, c, k):
            if k == len(word):
                return True
            if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[k]:
                return False
            temp = board[r][c]
            board[r][c] = '#'
            found = (dfs(r + 1, c, k + 1) or
                     dfs(r - 1, c, k + 1) or
                     dfs(r, c + 1, k + 1) or
                     dfs(r, c - 1, k + 1))
            board[r][c] = temp
            return found
        for r in range(rows):
            for c in range(cols):
                if board[r][c] == word[0] and dfs(r, c, 0):
                    return True
        return False`,
        approach: 'In-Place Grid Sentinel Backtracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'cpp',
        code: `#include <vector>
#include <string>

using namespace std;

class Solution {
private:
    bool dfs(int r, int c, int k, vector<vector<char>>& board, const string& word) {
        if (k == (int)word.size()) return true;
        if (r < 0 || r >= (int)board.size() || c < 0 || c >= (int)board[0].size() || board[r][c] != word[k]) {
            return false;
        }
        char temp = board[r][c];
        board[r][c] = '#';
        bool found = dfs(r + 1, c, k + 1, board, word) ||
                     dfs(r - 1, c, k + 1, board, word) ||
                     dfs(r, c + 1, k + 1, board, word) ||
                     dfs(r, c - 1, k + 1, board, word);
        board[r][c] = temp;
        return found;
    }
public:
    bool exist(vector<vector<char>>& board, string word) {
        for (int r = 0; r < (int)board.size(); r++) {
            for (int c = 0; c < (int)board[0].size(); c++) {
                if (board[r][c] == word[0] && dfs(r, c, 0, board, word)) {
                    return true;
                }
            }
        }
        return false;
    }
};`,
        approach: 'In-Place Character Replacement DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'java',
        code: `class Solution {
    private boolean dfs(int r, int c, int k, char[][] board, String word) {
        if (k == word.length()) return true;
        if (r < 0 || r >= board.length || c < 0 || c >= board[0].length || board[r][c] != word.charAt(k)) {
            return false;
        }
        char temp = board[r][c];
        board[r][c] = '#';
        boolean found = dfs(r + 1, c, k + 1, board, word) ||
                        dfs(r - 1, c, k + 1, board, word) ||
                        dfs(r, c + 1, k + 1, board, word) ||
                        dfs(r, c - 1, k + 1, board, word);
        board[r][c] = temp;
        return found;
    }

    public boolean exist(char[][] board, String word) {
        for (int r = 0; r < board.length; r++) {
            for (int c = 0; c < board[0].length; c++) {
                if (board[r][c] == word.charAt(0) && dfs(r, c, 0, board, word)) {
                    return true;
                }
            }
        }
        return false;
    }
}`,
        approach: 'Four-Way Grid DFS with In-Place Restoration',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      },
      {
        lang: 'javascript',
        code: `/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    const rows = board.length;
    const cols = board[0].length;
    function dfs(r, c, k) {
        if (k === word.length) return true;
        if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[k]) {
            return false;
        }
        const temp = board[r][c];
        board[r][c] = '#';
        const found = dfs(r + 1, c, k + 1) ||
                      dfs(r - 1, c, k + 1) ||
                      dfs(r, c + 1, k + 1) ||
                      dfs(r, c - 1, k + 1);
        board[r][c] = temp;
        return found;
    }
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (board[r][c] === word[0] && dfs(r, c, 0)) {
                return true;
            }
        }
    }
    return false;
};`,
        approach: 'Four-Directional Grid Backtracking',
        verifiedBy: 'tests',
        testedOn: '2026-10-18'
      }
    ]
  }
];

export function writeBatch3() {
  const problemsDir = path.join(rootDir, 'dataset', 'problems');
  const testsDir = path.join(rootDir, 'dataset', 'tests');

  for (const prob of BATCH3_PROBLEMS) {
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
      comparator: (prob.slug === 'subsets' || prob.slug === 'combination-sum' || prob.slug === 'permutations') ? 'property' : 'exact',
      method: prob.method,
      reference: `Independent algorithmic reference test for ${prob.slug}`
    };
    fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(meta, null, 2) + '\n', 'utf8');
  }

  console.log(`✓ Successfully populated ${BATCH3_PROBLEMS.length} problem files and meta.json test configs`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeBatch3();
}
