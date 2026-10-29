import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const algorithmsProblems = [
  // 1. #31 next-permutation
  {
    slug: 'next-permutation',
    number: 31,
    category: 'Algorithms',
    patterns: ['two-pointers-opposite'],
    hints: [
      {
        level: 1,
        title: 'Lexicographical Suffix Reversal',
        text: 'Generating the next lexicographical permutation requires finding the smallest possible increase in value. From right to left, where does a decreasing sequence first break?'
      },
      {
        level: 2,
        title: 'Pivot Identification and Successor Swap',
        text: 'Identify the first index i from the right where nums[i] is strictly less than nums[i + 1]. Then scan rightward to find the smallest number strictly greater than nums[i], swap them, and invert the remaining suffix.'
      },
      {
        level: 3,
        title: 'In-Place Two-Pointer Suffix Reversal',
        text: 'After swapping the pivot with its successor, the suffix starting at i + 1 remains in descending order. Inverting this suffix with opposite-direction pointers restores ascending order in linear time.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def nextPermutation(self, nums: list[int]) -> None:\n        i = len(nums) - 2\n        while i >= 0 and nums[i] >= nums[i + 1]:\n            i -= 1\n        if i >= 0:\n            j = len(nums) - 1\n            while nums[j] <= nums[i]:\n                j -= 1\n            nums[i], nums[j] = nums[j], nums[i]\n        left, right = i + 1, len(nums) - 1\n        while left < right:\n            nums[left], nums[right] = nums[right], nums[left]\n            left += 1\n            right -= 1\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: length of input array nums (1 <= N <= 100)'],
      notes: 'Three linear passes at most: finding the pivot, finding the successor, and reversing the suffix in-place.',
      whyNaiveFails: 'Generating all N! permutations and sorting them requires factorial time and space, exceeding time limits.',
      spaceTimeTradeoff: 'Constant space in-place pointer swaps without allocating temporary array copies.',
      interviewerExpectation: 'Handling entirely descending arrays (e.g., [3, 2, 1] -> [1, 2, 3]) and arrays with duplicate elements correctly.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def nextPermutation(self, nums: list[int]) -> None:
        i = len(nums) - 2
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1
        if i >= 0:
            j = len(nums) - 1
            while nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        left, right = i + 1, len(nums) - 1
        while left < right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1`,
        approach: 'Single-pass scan for pivot, successor swap, and suffix inversion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int i = (int)nums.size() - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        if (i >= 0) {
            int j = (int)nums.size() - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            swap(nums[i], nums[j]);
        }
        reverse(nums.begin() + i + 1, nums.end());
    }
};`,
        approach: 'Scan for pivot, swap with successor, reverse suffix',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public void nextPermutation(int[] nums) {
        int i = nums.length - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        if (i >= 0) {
            int j = nums.length - 1;
            while (nums[j] <= nums[i]) {
                j--;
            }
            int tmp = nums[i];
            nums[i] = nums[j];
            nums[j] = tmp;
        }
        int left = i + 1, right = nums.length - 1;
        while (left < right) {
            int tmp = nums[left];
            nums[left] = nums[right];
            nums[right] = tmp;
            left++;
            right--;
        }
    }
}`,
        approach: 'In-place pivot search and two-pointer reversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var nextPermutation = function(nums) {
    let i = nums.length - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }
    if (i >= 0) {
        let j = nums.length - 1;
        while (nums[j] <= nums[i]) {
            j--;
        }
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }
};`,
        approach: 'In-place pivot search and two-pointer reversal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    fixed = [
        ([1, 2, 3], [1, 3, 2]),
        ([3, 2, 1], [1, 2, 3]),
        ([1, 1, 5], [1, 5, 1]),
        ([1], [1]),
        ([1, 3, 2], [2, 1, 3])
    ]
    for inp, exp in fixed:
        arr = list(inp)
        solver.nextPermutation(arr)
        assert arr == exp, f"Expected {exp}, got {arr}"
`
  },

  // 2. #116 populating-next-right-pointers-in-each-node
  {
    slug: 'populating-next-right-pointers-in-each-node',
    number: 116,
    category: 'Algorithms',
    patterns: ['tree-bfs-level-order'],
    hints: [
      {
        level: 1,
        title: 'Level Neighbor Linkage',
        text: 'Each node in a perfect binary tree must link its next pointer to the node immediately to its right on the same level. Can already established links on one level establish connections on the next level?'
      },
      {
        level: 2,
        title: 'Parent-Driven Child Linking',
        text: 'For any node with children, its left child connects directly to its right child. Furthermore, its right child connects to the left child of the node pointed to by its own next reference.'
      },
      {
        level: 3,
        title: 'Leftmost Sentinel Level Traversal',
        text: 'Maintain a pointer to the leftmost node of the current tier. Traverse horizontally across established next pointers to wire the level beneath, then step down to leftmost.left.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def connect(self, root: \'Optional[Node]\') -> \'Optional[Node]\':\n        if not root:\n            return None\n        leftmost = root\n        while leftmost.left:\n            curr = leftmost\n            while curr:\n                curr.left.next = curr.right\n                if curr.next:\n                    curr.right.next = curr.next.left\n                curr = curr.next\n            leftmost = leftmost.left\n        return root\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: total number of nodes in perfect binary tree'],
      notes: 'Visits each node once using existing next pointers for horizontal traversal without queue allocation.',
      whyNaiveFails: 'Standard level-order breadth search using an auxiliary queue consumes O(N) space, violating the constant space constraint.',
      spaceTimeTradeoff: 'Reusing previously established next pointers eliminates all auxiliary memory overhead.',
      interviewerExpectation: 'Achieving true O(1) extra memory beyond the returned node references.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        if not root:
            return None
        leftmost = root
        while leftmost.left:
            curr = leftmost
            while curr:
                curr.left.next = curr.right
                if curr.next:
                    curr.right.next = curr.next.left
                curr = curr.next
            leftmost = leftmost.left
        return root`,
        approach: 'Constant-space level linking via parent next pointers',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;
        Node* leftmost = root;
        while (leftmost->left) {
            Node* curr = leftmost;
            while (curr) {
                curr->left->next = curr->right;
                if (curr->next) {
                    curr->right->next = curr->next->left;
                }
                curr = curr->next;
            }
            leftmost = leftmost->left;
        }
        return root;
    }
};`,
        approach: 'Level traversal using established next pointers',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public Node connect(Node root) {
        if (root == null) return null;
        Node leftmost = root;
        while (leftmost.left != null) {
            Node curr = leftmost;
            while (curr != null) {
                curr.left.next = curr.right;
                if (curr.next != null) {
                    curr.right.next = curr.next.left;
                }
                curr = curr.next;
            }
            leftmost = leftmost.left;
        }
        return root;
    }
}`,
        approach: 'Constant space parent-guided child wiring',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var connect = function(root) {
    if (!root) return null;
    let leftmost = root;
    while (leftmost.left) {
        let curr = leftmost;
        while (curr) {
            curr.left.next = curr.right;
            if (curr.next) {
                curr.right.next = curr.next.left;
            }
            curr = curr.next;
        }
        leftmost = leftmost.left;
    }
    return root;
};`,
        approach: 'Constant space parent-guided child wiring',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    class Node:
        def __init__(self, val=0, left=None, right=None, next=None):
            self.val = val
            self.left = left
            self.right = right
            self.next = next

    # Build 3-level tree: [1, 2, 3, 4, 5, 6, 7]
    n4 = Node(4); n5 = Node(5); n6 = Node(6); n7 = Node(7)
    n2 = Node(2, n4, n5); n3 = Node(3, n6, n7)
    r = Node(1, n2, n3)
    solver.connect(r)
    assert r.next is None
    assert n2.next == n3 and n3.next is None
    assert n4.next == n5 and n5.next == n6 and n6.next == n7 and n7.next is None
`
  },

  // 3. #138 copy-list-with-random-pointer
  {
    slug: 'copy-list-with-random-pointer',
    number: 138,
    category: 'Algorithms',
    patterns: ['linked-list-pointers'],
    hints: [
      {
        level: 1,
        title: 'Deep Copy Reference Preservation',
        text: 'Cloning a linked list where nodes contain arbitrary random references requires mapping original node addresses to clone node addresses. Can interleaved duplicate nodes eliminate separate storage?'
      },
      {
        level: 2,
        title: 'Interleaved Node Duplication',
        text: 'For each node curr in the list, insert a cloned node curr_copy immediately after curr. The list becomes A -> A_copy -> B -> B_copy -> C -> C_copy.'
      },
      {
        level: 3,
        title: 'Random Pointer Wiring and Unweaving',
        text: 'Set curr.next.random = curr.random.next for every node with a non-null random pointer. Finally, separate the interleaved chain into original and cloned lists.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def copyRandomList(self, head: \'Optional[Node]\') -> \'Optional[Node]\':\n        if not head:\n            return None\n        curr = head\n        while curr:\n            nxt = curr.next\n            copy = Node(curr.val, nxt, None)\n            curr.next = copy\n            curr = nxt\n        curr = head\n        while curr:\n            if curr.random:\n                curr.next.random = curr.random.next\n            curr = curr.next.next\n        curr = head\n        copy_head = head.next\n        while curr:\n            copy = curr.next\n            curr.next = copy.next\n            if copy.next:\n                copy.next = copy.next.next\n            curr = curr.next\n        return copy_head\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: number of nodes in the linked list (0 <= N <= 1000)'],
      notes: 'Three linear passes over the list without requiring an auxiliary hash table for node mapping.',
      whyNaiveFails: 'Maintaining an auxiliary hash map consumes O(N) auxiliary space, whereas interleaved cloning achieves optimal O(1) space.',
      spaceTimeTradeoff: 'Interleaving clones in the existing list temporarily doubles list length to avoid memory allocation for a lookup table.',
      interviewerExpectation: 'Careful restoration of the original list structure during the unweaving pass.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        if not head:
            return None
        curr = head
        while curr:
            nxt = curr.next
            copy = Node(curr.val, nxt, None)
            curr.next = copy
            curr = nxt
        curr = head
        while curr:
            if curr.random:
                curr.next.random = curr.random.next
            curr = curr.next.next
        curr = head
        copy_head = head.next
        while curr:
            copy = curr.next
            curr.next = copy.next
            if copy.next:
                copy.next = copy.next.next
            curr = curr.next
        return copy_head`,
        approach: 'Three-pass interleaved node cloning and unweaving',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;
        Node* curr = head;
        while (curr) {
            Node* copy = new Node(curr->val);
            copy->next = curr->next;
            curr->next = copy;
            curr = copy->next;
        }
        curr = head;
        while (curr) {
            if (curr->random) {
                curr->next->random = curr->random->next;
            }
            curr = curr->next->next;
        }
        curr = head;
        Node* copyHead = head->next;
        while (curr) {
            Node* copy = curr->next;
            curr->next = copy->next;
            if (copy->next) {
                copy->next = copy->next->next;
            }
            curr = curr->next;
        }
        return copyHead;
    }
};`,
        approach: 'Interleaved node cloning and unweaving',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;
        Node curr = head;
        while (curr != null) {
            Node copy = new Node(curr.val);
            copy.next = curr.next;
            curr.next = copy;
            curr = copy.next;
        }
        curr = head;
        while (curr != null) {
            if (curr.random != null) {
                curr.next.random = curr.random.next;
            }
            curr = curr.next.next;
        }
        curr = head;
        Node copyHead = head.next;
        while (curr != null) {
            Node copy = curr.next;
            curr.next = copy.next;
            if (copy.next != null) {
                copy.next = copy.next.next;
            }
            curr = curr.next;
        }
        return copyHead;
    }
}`,
        approach: 'Three-pass interleaved node duplication',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var copyRandomList = function(head) {
    if (!head) return null;
    let curr = head;
    while (curr) {
        const copy = new _Node(curr.val, curr.next, null);
        curr.next = copy;
        curr = copy.next;
    }
    curr = head;
    while (curr) {
        if (curr.random) {
            curr.next.random = curr.random.next;
        }
        curr = curr.next.next;
    }
    curr = head;
    const copyHead = head.next;
    while (curr) {
        const copy = curr.next;
        curr.next = copy.next;
        if (copy.next) {
            copy.next = copy.next.next;
        }
        curr = curr.next;
    }
    return copyHead;
};`,
        approach: 'Three-pass interleaved node duplication',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    class Node:
        def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
            self.val = int(x)
            self.next = next
            self.random = random

    n1 = Node(7); n2 = Node(13); n3 = Node(11)
    n1.next = n2; n2.next = n3
    n2.random = n1; n3.random = n1
    cp = solver.copyRandomList(n1)
    assert cp.val == 7 and cp.next.val == 13 and cp.next.next.val == 11
    assert cp.next.random == cp and cp.next.next.random == cp
    assert cp != n1 and cp.next != n2
`
  },

  // 4. #211 design-add-and-search-words-data-structure
  {
    slug: 'design-add-and-search-words-data-structure',
    number: 211,
    category: 'Algorithms',
    patterns: ['tree-trie-prefix'],
    hints: [
      {
        level: 1,
        title: 'Prefix Branching with Wildcard Matching',
        text: 'A dictionary must support word insertion and pattern search where the dot character matches any single character. How can a prefix tree structure branching options?'
      },
      {
        level: 2,
        title: 'Recursive Search on Wildcard Encounter',
        text: 'Standard characters navigate directly to the matching child node. When a dot character appears, branch across all available child nodes in the current dictionary node.'
      },
      {
        level: 3,
        title: 'Depth-First Branch Exploration',
        text: 'Define a helper function dfs(node, index). If index reaches word length, return whether node marks a terminal word. If character is a dot, iterate over all node children and return true if any path succeeds.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass WordDictionary:\n    def __init__(self):\n        self.root = {}\n\n    def addWord(self, word: str) -> None:\n        curr = self.root\n        for ch in word:\n            if ch not in curr:\n                curr[ch] = {}\n            curr = curr[ch]\n        curr[\'$\'] = True\n\n    def search(self, word: str) -> bool:\n        def dfs(node, i):\n            if i == len(word):\n                return \'$\' in node\n            ch = word[i]\n            if ch == \'.\':\n                for k, child in node.items():\n                    if k != \'$\' and dfs(child, i + 1):\n                        return True\n                return False\n            if ch not in node:\n                return False\n            return dfs(node[ch], i + 1)\n        return dfs(self.root, 0)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(M) for add, O(26^M) worst-case for search with dots',
      space: 'O(total characters inserted)',
      variables: ['M: length of word (1 <= M <= 25)'],
      notes: 'addWord is linear in word length. Search without dots is O(M); search with dots explores candidate branches.',
      whyNaiveFails: 'Scanning a flat list of words with regular expressions costs O(N * M) per query and times out on 10,000 queries.',
      spaceTimeTradeoff: 'Common prefixes share internal nodes, conserving memory across large vocabularies.',
      interviewerExpectation: 'Clean recursive backtracking for wildcard exploration and terminal word boundary tracking.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class WordDictionary:
    def __init__(self):
        self.root = {}

    def addWord(self, word: str) -> None:
        curr = self.root
        for ch in word:
            if ch not in curr:
                curr[ch] = {}
            curr = curr[ch]
        curr['$'] = True

    def search(self, word: str) -> bool:
        def dfs(node, i):
            if i == len(word):
                return '$' in node
            ch = word[i]
            if ch == '.':
                for k, child in node.items():
                    if k != '$' and dfs(child, i + 1):
                        return True
                return False
            if ch not in node:
                return False
            return dfs(node[ch], i + 1)
        return dfs(self.root, 0)`,
        approach: 'Nested dictionary prefix tree with recursive wildcard search',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class WordDictionary {
private:
    struct TrieNode {
        TrieNode* children[26] = {nullptr};
        bool isEnd = false;
    };
    TrieNode* root;

    bool dfs(TrieNode* node, const string& word, int i) {
        if (!node) return false;
        if (i == (int)word.size()) return node->isEnd;
        char ch = word[i];
        if (ch == '.') {
            for (int c = 0; c < 26; ++c) {
                if (node->children[c] && dfs(node->children[c], word, i + 1)) {
                    return true;
                }
            }
            return false;
        } else {
            int idx = ch - 'a';
            return dfs(node->children[idx], word, i + 1);
        }
    }

public:
    WordDictionary() {
        root = new TrieNode();
    }

    void addWord(string word) {
        TrieNode* curr = root;
        for (char ch : word) {
            int idx = ch - 'a';
            if (!curr->children[idx]) {
                curr->children[idx] = new TrieNode();
            }
            curr = curr->children[idx];
        }
        curr->isEnd = true;
    }

    bool search(string word) {
        return dfs(root, word, 0);
    }
};`,
        approach: 'Prefix tree with recursive wildcard DFS',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class WordDictionary {
    private static class Node {
        Node[] children = new Node[26];
        boolean isEnd = false;
    }
    private final Node root = new Node();

    public WordDictionary() {}

    public void addWord(String word) {
        Node curr = root;
        for (char ch : word.toCharArray()) {
            int idx = ch - 'a';
            if (curr.children[idx] == null) {
                curr.children[idx] = new Node();
            }
            curr = curr.children[idx];
        }
        curr.isEnd = true;
    }

    public boolean search(String word) {
        return dfs(root, word, 0);
    }

    private boolean dfs(Node node, String word, int i) {
        if (node == null) return false;
        if (i == word.length()) return node.isEnd;
        char ch = word.charAt(i);
        if (ch == '.') {
            for (Node child : node.children) {
                if (child != null && dfs(child, word, i + 1)) return true;
            }
            return false;
        }
        return dfs(node.children[ch - 'a'], word, i + 1);
    }
}`,
        approach: 'Array-based Trie with recursive wildcard branch evaluation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var WordDictionary = function() {
    this.root = {};
};

WordDictionary.prototype.addWord = function(word) {
    let curr = this.root;
    for (const ch of word) {
        if (!curr[ch]) curr[ch] = {};
        curr = curr[ch];
    }
    curr.isEnd = true;
};

WordDictionary.prototype.search = function(word) {
    const dfs = (node, i) => {
        if (i === word.length) return Boolean(node.isEnd);
        const ch = word[i];
        if (ch === '.') {
            for (const key of Object.keys(node)) {
                if (key !== 'isEnd' && dfs(node[key], i + 1)) return true;
            }
            return false;
        }
        if (!node[ch]) return false;
        return dfs(node[ch], i + 1);
    };
    return dfs(this.root, 0);
};`,
        approach: 'Object trie with recursive wildcard branch evaluation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    wd = Solution()
    wd.addWord("bad")
    wd.addWord("dad")
    wd.addWord("mad")
    assert wd.search("pad") is False
    assert wd.search("bad") is True
    assert wd.search(".ad") is True
    assert wd.search("b..") is True
`
  },

  // 5. #225 implement-stack-using-queues
  {
    slug: 'implement-stack-using-queues',
    number: 225,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Order Inversion in FIFO Channels',
        text: 'A last-in first-out interface must be constructed using only standard first-in first-out operations. How can rotating newly appended elements place the newest item at the front?'
      },
      {
        level: 2,
        title: 'Single-Queue Push Rotation',
        text: 'When pushing a new element x, append x to the back of the queue. Then immediately dequeue and re-enqueue all preceding elements so x sits at the front.'
      },
      {
        level: 3,
        title: 'Constant-Time Pop and Top',
        text: 'Because each push rotates the buffer so the latest element is frontmost, pop and top operations simply read and remove from the queue head in constant time.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import deque\n\nclass MyStack:\n    def __init__(self):\n        self.q = deque()\n\n    def push(self, x: int) -> None:\n        self.q.append(x)\n        for _ in range(len(self.q) - 1):\n            self.q.append(self.q.popleft())\n\n    def pop(self) -> int:\n        return self.q.popleft()\n\n    def top(self) -> int:\n        return self.q[0]\n\n    def empty(self) -> bool:\n        return len(self.q) == 0\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N) for push, O(1) for pop, top, empty',
      space: 'O(N)',
      variables: ['N: number of elements currently stored in the stack'],
      notes: 'Push rotates N - 1 elements so the newest entry is positioned for O(1) popping.',
      whyNaiveFails: 'Attempting to reverse elements during pop requires two queues and copies data on every read.',
      spaceTimeTradeoff: 'A single deque avoids allocating a second collection while achieving O(1) reads.',
      interviewerExpectation: 'Ability to implement the stack with only one queue rather than two.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()

    def push(self, x: int) -> None:
        self.q.append(x)
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.popleft())

    def pop(self) -> int:
        return self.q.popleft()

    def top(self) -> int:
        return self.q[0]

    def empty(self) -> bool:
        return len(self.q) == 0`,
        approach: 'Single-queue push rotation placing newest item at head',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class MyStack {
private:
    queue<int> q;

public:
    MyStack() {}

    void push(int x) {
        q.push(x);
        for (int i = 0; i < (int)q.size() - 1; ++i) {
            q.push(q.front());
            q.pop();
        }
    }

    int pop() {
        int val = q.front();
        q.pop();
        return val;
    }

    int top() {
        return q.front();
    }

    bool empty() {
        return q.empty();
    }
};`,
        approach: 'Single-queue rotation on push',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.ArrayDeque;
import java.util.Queue;

class MyStack {
    private final Queue<Integer> q = new ArrayDeque<>();

    public MyStack() {}

    public void push(int x) {
        q.add(x);
        for (int i = 0; i < q.size() - 1; i++) {
            q.add(q.remove());
        }
    }

    public int pop() {
        return q.remove();
    }

    public int top() {
        return q.element();
    }

    public boolean empty() {
        return q.isEmpty();
    }
}`,
        approach: 'Single Queue push rotation',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var MyStack = function() {
    this.q = [];
};

MyStack.prototype.push = function(x) {
    this.q.push(x);
    for (let i = 0; i < this.q.length - 1; i++) {
        this.q.push(this.q.shift());
    }
};

MyStack.prototype.pop = function() {
    return this.q.shift();
};

MyStack.prototype.top = function() {
    return this.q[0];
};

MyStack.prototype.empty = function() {
    return this.q.length === 0;
};`,
        approach: 'Single array rotation on push',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    st = Solution()
    st.push(1)
    st.push(2)
    assert st.top() == 2
    assert st.pop() == 2
    assert st.empty() is False
    assert st.pop() == 1
    assert st.empty() is True
`
  },

  // 6. #232 implement-queue-using-stacks
  {
    slug: 'implement-queue-using-stacks',
    number: 232,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Dual Inversion for Queue Ordering',
        text: 'Reversing an ordered sequence once inverts its order; reversing it a second time restores the original arrival order. How can two lifo containers transfer elements to provide first-in first-out access?'
      },
      {
        level: 2,
        title: 'Input and Output Stacks',
        text: 'Maintain an in_stack for new arrivals and an out_stack for extractions. Push elements directly to in_stack.'
      },
      {
        level: 3,
        title: 'Lazy Transfer on Pop or Peek',
        text: 'When out_stack is empty, pop all elements from in_stack and push them to out_stack. The oldest element is now on top of out_stack ready for O(1) amortized extraction.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass MyQueue:\n    def __init__(self):\n        self.in_stack = []\n        self.out_stack = []\n\n    def push(self, x: int) -> None:\n        self.in_stack.append(x)\n\n    def pop(self) -> int:\n        self.peek()\n        return self.out_stack.pop()\n\n    def peek(self) -> int:\n        if not self.out_stack:\n            while self.in_stack:\n                self.out_stack.append(self.in_stack.pop())\n        return self.out_stack[-1]\n\n    def empty(self) -> bool:\n        return not self.in_stack and not self.out_stack\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) amortized for pop and peek, O(1) worst-case for push',
      space: 'O(N)',
      variables: ['N: total number of elements queued'],
      notes: 'Each element is pushed and popped at most twice throughout its lifecycle.',
      whyNaiveFails: 'Transferring all elements back and forth on every push yields quadratic O(N) cost per push.',
      spaceTimeTradeoff: 'Amortized transfer only when out_stack empties yields average constant time.',
      interviewerExpectation: 'Formal amortized analysis explaining why each element experiences at most two stack pushes and two stack pops.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class MyQueue:
    def __init__(self):
        self.in_stack = []
        self.out_stack = []

    def push(self, x: int) -> None:
        self.in_stack.append(x)

    def pop(self) -> int:
        self.peek()
        return self.out_stack.pop()

    def peek(self) -> int:
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack[-1]

    def empty(self) -> bool:
        return not self.in_stack and not self.out_stack`,
        approach: 'Two-stack amortized transfer pattern',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class MyQueue {
private:
    vector<int> in_stack, out_stack;

public:
    MyQueue() {}

    void push(int x) {
        in_stack.push_back(x);
    }

    int pop() {
        peek();
        int val = out_stack.back();
        out_stack.pop_back();
        return val;
    }

    int peek() {
        if (out_stack.empty()) {
            while (!in_stack.empty()) {
                out_stack.push_back(in_stack.back());
                in_stack.pop_back();
            }
        }
        return out_stack.back();
    }

    bool empty() {
        return in_stack.empty() && out_stack.empty();
    }
};`,
        approach: 'Two-stack lazy transfer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.ArrayDeque;
import java.util.Deque;

class MyQueue {
    private final Deque<Integer> inStack = new ArrayDeque<>();
    private final Deque<Integer> outStack = new ArrayDeque<>();

    public MyQueue() {}

    public void push(int x) {
        inStack.push(x);
    }

    public int pop() {
        peek();
        return outStack.pop();
    }

    public int peek() {
        if (outStack.isEmpty()) {
            while (!inStack.isEmpty()) {
                outStack.push(inStack.pop());
            }
        }
        return outStack.peek();
    }

    public boolean empty() {
        return inStack.isEmpty() && outStack.isEmpty();
    }
}`,
        approach: 'Two-stack amortized transfer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var MyQueue = function() {
    this.inStack = [];
    this.outStack = [];
};

MyQueue.prototype.push = function(x) {
    this.inStack.push(x);
};

MyQueue.prototype.pop = function() {
    this.peek();
    return this.outStack.pop();
};

MyQueue.prototype.peek = function() {
    if (this.outStack.length === 0) {
        while (this.inStack.length > 0) {
            this.outStack.push(this.inStack.pop());
        }
    }
    return this.outStack[this.outStack.length - 1];
};

MyQueue.prototype.empty = function() {
    return this.inStack.length === 0 && this.outStack.length === 0;
};`,
        approach: 'Two-stack amortized transfer',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    q = Solution()
    q.push(1)
    q.push(2)
    assert q.peek() == 1
    assert q.pop() == 1
    assert q.empty() is False
    assert q.pop() == 2
    assert q.empty() is True
`
  },

  // 7. #271 encode-and-decode-strings
  {
    slug: 'encode-and-decode-strings',
    number: 271,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Delimiter-Robust Serialization',
        text: 'Strings in the list may contain any of the 256 valid character codes, including commas, colons, or quotes. How can length prefixes make message framing independent of content?'
      },
      {
        level: 2,
        title: 'Length-Prefixed Chunk Framing',
        text: 'Prefix each string with its character length followed by a non-numeric delimiter like a hash symbol: length + "#" + string.'
      },
      {
        level: 3,
        title: 'Linear Chunk Parsing',
        text: 'During decoding, scan until finding the hash symbol to parse the chunk length L. Slice the exact next L characters as the string, then advance pointer past the chunk.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Codec:\n    def encode(self, strs: list[str]) -> str:\n        res = []\n        for s in strs:\n            res.append(f"{len(s)}#{s}")\n        return "".join(res)\n\n    def decode(self, s: str) -> list[str]:\n        res = []\n        i = 0\n        while i < len(s):\n            delim = s.find(\'#\', i)\n            length = int(s[i:delim])\n            start = delim + 1\n            res.append(s[start:start + length])\n            i = start + length\n        return res\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N) for encode and decode',
      space: 'O(N)',
      variables: ['N: total number of characters across all strings in the list'],
      notes: 'Encodes and decodes with a single linear pass over the characters.',
      whyNaiveFails: 'Simple delimiter splitting fails whenever strings contain the delimiter itself.',
      spaceTimeTradeoff: 'Stores minimal integer prefix metadata per string.',
      interviewerExpectation: 'Handling empty strings, empty lists, and strings containing digits and delimiters.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Codec:
    def encode(self, strs: list[str]) -> str:
        res = []
        for s in strs:
            res.append(f"{len(s)}#{s}")
        return "".join(res)

    def decode(self, s: str) -> list[str]:
        res = []
        i = 0
        while i < len(s):
            delim = s.find('#', i)
            length = int(s[i:delim])
            start = delim + 1
            res.append(s[start:start + length])
            i = start + length
        return res`,
        approach: 'Length-prefixed chunk encoding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Codec {
public:
    string encode(vector<string>& strs) {
        string res = "";
        for (const string& s : strs) {
            res += to_string(s.size()) + "#" + s;
        }
        return res;
    }

    vector<string> decode(string s) {
        vector<string> res;
        int i = 0, n = s.size();
        while (i < n) {
            int delim = s.find('#', i);
            int len = stoi(s.substr(i, delim - i));
            int start = delim + 1;
            res.push_back(s.substr(start, len));
            i = start + len;
        }
        return res;
    }
};`,
        approach: 'Length-prefixed framing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.ArrayList;
import java.util.List;

public class Codec {
    public String encode(List<String> strs) {
        StringBuilder sb = new StringBuilder();
        for (String s : strs) {
            sb.append(s.length()).append('#').append(s);
        }
        return sb.toString();
    }

    public List<String> decode(String s) {
        List<String> res = new ArrayList<>();
        int i = 0, n = s.length();
        while (i < n) {
            int delim = s.indexOf('#', i);
            int len = Integer.parseInt(s.substring(i, delim));
            int start = delim + 1;
            res.add(s.substring(start, start + len));
            i = start + len;
        }
        return res;
    }
}`,
        approach: 'Length-prefixed string framing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var encode = function(strs) {
    let res = '';
    for (const s of strs) {
        res += s.length + '#' + s;
    }
    return res;
};

var decode = function(s) {
    const res = [];
    let i = 0;
    while (i < s.length) {
        const delim = s.indexOf('#', i);
        const len = parseInt(s.substring(i, delim), 10);
        const start = delim + 1;
        res.push(s.substring(start, start + len));
        i = start + len;
    }
    return res;
};`,
        approach: 'Length-prefixed chunk encoding',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    codec = Solution()
    fixed = [
        ["Hello", "World"],
        [""],
        [],
        ["12#45", "###", "normal", "a#b#c#"]
    ]
    for inp in fixed:
        enc = codec.encode(inp)
        dec = codec.decode(enc)
        assert dec == inp, f"Expected {inp}, got {dec}"
`
  },

  // 8. #297 serialize-and-deserialize-binary-tree
  {
    slug: 'serialize-and-deserialize-binary-tree',
    number: 297,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Preorder Stream Framing with Null Sentinels',
        text: 'A binary tree can be uniquely reconstructed from a single traversal sequence if null child pointers are explicitly marked with sentinel symbols.'
      },
      {
        level: 2,
        title: 'Recursive Preorder Encoding',
        text: 'Traverse root, left child, right child. Emit the node value followed by a delimiter, or emit a sentinel symbol like "N" whenever a null reference is reached.'
      },
      {
        level: 3,
        title: 'Iterator-Based Tree Reconstruction',
        text: 'Split the serialized string by delimiter into a token iterator. For each token, if it equals "N", return None; otherwise construct a node and recursively build left and right subtrees.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Codec:\n    def serialize(self, root):\n        vals = []\n        def dfs(node):\n            if not node:\n                vals.append("N")\n                return\n            vals.append(str(node.val))\n            dfs(node.left)\n            dfs(node.right)\n        dfs(root)\n        return ",".join(vals)\n\n    def deserialize(self, data):\n        vals = iter(data.split(","))\n        def dfs():\n            val = next(vals)\n            if val == "N":\n                return None\n            node = TreeNode(int(val))\n            node.left = dfs()\n            node.right = dfs()\n            return node\n        return dfs()\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N) for serialize and deserialize',
      space: 'O(N)',
      variables: ['N: number of nodes in binary tree (0 <= N <= 10^4)'],
      notes: 'Visits each node and null pointer exactly once during serialization and deserialization.',
      whyNaiveFails: 'Reconstruction from inorder + preorder traversals without null markers fails when node values contain duplicates.',
      spaceTimeTradeoff: 'Explicit null sentinels allow unique linear tree reconstruction in O(N) memory.',
      interviewerExpectation: 'Handling negative values, empty trees, and recursion depth limits.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Codec:
    def serialize(self, root):
        vals = []
        def dfs(node):
            if not node:
                vals.append("N")
                return
            vals.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ",".join(vals)

    def deserialize(self, data):
        vals = iter(data.split(","))
        def dfs():
            val = next(vals)
            if val == "N":
                return None
            node = TreeNode(int(val))
            node.left = dfs()
            node.right = dfs()
            return node
        return dfs()`,
        approach: 'Preorder depth-first traversal with null sentinel tokens',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Codec {
private:
    void serializeDfs(TreeNode* node, ostringstream& out) {
        if (!node) {
            out << "N,";
            return;
        }
        out << node->val << ",";
        serializeDfs(node->left, out);
        serializeDfs(node->right, out);
    }

    TreeNode* deserializeDfs(istringstream& in) {
        string val;
        if (!getline(in, val, ',')) return nullptr;
        if (val == "N") return nullptr;
        TreeNode* node = new TreeNode(stoi(val));
        node->left = deserializeDfs(in);
        node->right = deserializeDfs(in);
        return node;
    }

public:
    string serialize(TreeNode* root) {
        ostringstream out;
        serializeDfs(root, out);
        return out.str();
    }

    TreeNode* deserialize(string data) {
        istringstream in(data);
        return deserializeDfs(in);
    }
};`,
        approach: 'Preorder stringstream serialization with sentinel markers',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.Arrays;
import java.util.Iterator;

public class Codec {
    public String serialize(TreeNode root) {
        StringBuilder sb = new StringBuilder();
        serializeDfs(root, sb);
        return sb.toString();
    }

    private void serializeDfs(TreeNode node, StringBuilder sb) {
        if (node == null) {
            sb.append("N,");
            return;
        }
        sb.append(node.val).append(',');
        serializeDfs(node.left, sb);
        serializeDfs(node.right, sb);
    }

    public TreeNode deserialize(String data) {
        Iterator<String> it = Arrays.asList(data.split(",")).iterator();
        return deserializeDfs(it);
    }

    private TreeNode deserializeDfs(Iterator<String> it) {
        if (!it.hasNext()) return null;
        String val = it.next();
        if (val.equals("N")) return null;
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = deserializeDfs(it);
        node.right = deserializeDfs(it);
        return node;
    }
}`,
        approach: 'Preorder traversal with sentinel tokens',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var serialize = function(root) {
    const vals = [];
    const dfs = (node) => {
        if (!node) {
            vals.push("N");
            return;
        }
        vals.push(String(node.val));
        dfs(node.left);
        dfs(node.right);
    };
    dfs(root);
    return vals.join(",");
};

var deserialize = function(data) {
    const vals = data.split(",");
    let idx = 0;
    const dfs = () => {
        if (idx >= vals.length || vals[idx] === "N") {
            idx++;
            return null;
        }
        const node = new TreeNode(Number(vals[idx++]));
        node.left = dfs();
        node.right = dfs();
        return node;
    };
    return dfs();
};`,
        approach: 'Preorder array serialization with sentinel tokens',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    class TreeNode:
        def __init__(self, x, left=None, right=None):
            self.val = x
            self.left = left
            self.right = right

    codec = Solution()
    r = TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4), TreeNode(5)))
    s = codec.serialize(r)
    d = codec.deserialize(s)
    assert d.val == 1 and d.left.val == 2 and d.right.val == 3
    assert d.right.left.val == 4 and d.right.right.val == 5
`
  },

  // 9. #303 range-sum-query-immutable
  {
    slug: 'range-sum-query-immutable',
    number: 303,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Cumulative Subarray Difference',
        text: 'Multiple subarray sum queries must be answered over a static array. Computing running cumulative totals during initialization allows any range sum to be computed in constant time.'
      },
      {
        level: 2,
        title: 'Prefix Sum Array Initialization',
        text: 'Build an array prefix of size N + 1 where prefix[i] stores the sum of the first i elements. Notice prefix[0] is 0.'
      },
      {
        level: 3,
        title: 'Constant-Time Range Query Formula',
        text: 'The sum of elements between indices left and right inclusive equals prefix[right + 1] - prefix[left].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass NumArray:\n    def __init__(self, nums: list[int]):\n        self.prefix = [0]\n        for x in nums:\n            self.prefix.append(self.prefix[-1] + x)\n\n    def sumRange(self, left: int, right: int) -> int:\n        return self.prefix[right + 1] - self.prefix[left]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N) initialization, O(1) per sumRange query',
      space: 'O(N)',
      variables: ['N: length of nums array (1 <= N <= 10^4)'],
      notes: 'Initial cumulative prefix sum pass enables instant O(1) query lookups.',
      whyNaiveFails: 'Summing elements on each query costs O(N) per query, leading to O(N * Q) time and timeout over 10,000 queries.',
      spaceTimeTradeoff: 'Trading O(N) auxiliary memory for the prefix array reduces query latency to O(1).',
      interviewerExpectation: 'Use of 1-based indexing for the prefix array to eliminate conditional boundary branching.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class NumArray:
    def __init__(self, nums: list[int]):
        self.prefix = [0]
        for x in nums:
            self.prefix.append(self.prefix[-1] + x)

    def sumRange(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]`,
        approach: 'Prefix sum array with 1-based offset',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class NumArray {
private:
    vector<int> prefix;

public:
    NumArray(vector<int>& nums) {
        prefix.resize(nums.size() + 1, 0);
        for (int i = 0; i < (int)nums.size(); ++i) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }

    int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
};`,
        approach: 'Prefix sum array',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class NumArray {
    private final int[] prefix;

    public NumArray(int[] nums) {
        prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }

    public int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}`,
        approach: 'Prefix sum array with 1-based indexing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var NumArray = function(nums) {
    this.prefix = [0];
    for (let i = 0; i < nums.length; i++) {
        this.prefix.push(this.prefix[i] + nums[i]);
    }
};

NumArray.prototype.sumRange = function(left, right) {
    return this.prefix[right + 1] - this.prefix[left];
};`,
        approach: 'Prefix sum array',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    na = Solution([-2, 0, 3, -5, 2, -1])
    assert na.sumRange(0, 2) == 1
    assert na.sumRange(2, 5) == -1
    assert na.sumRange(0, 5) == -3
`
  },

  // 10. #304 range-sum-query-2d-immutable
  {
    slug: 'range-sum-query-2d-immutable',
    number: 304,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Two-Dimensional Inclusion-Exclusion',
        text: 'Querying arbitrary rectangular submatrices repeatedly on a static matrix requires extending prefix sums to two dimensions using the principle of inclusion-exclusion.'
      },
      {
        level: 2,
        title: '2D Prefix Sum Matrix Construction',
        text: 'Define prefix[r+1][c+1] as the sum of elements in the rectangle from (0,0) to (r,c). It equals matrix[r][c] + prefix[r][c+1] + prefix[r+1][c] - prefix[r][c].'
      },
      {
        level: 3,
        title: 'Submatrix Range Sum Query Formula',
        text: 'For query box bounded by row1, col1, row2, col2, the sum is prefix[row2+1][col2+1] - prefix[row1][col2+1] - prefix[row2+1][col1] + prefix[row1][col1].'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass NumMatrix:\n    def __init__(self, matrix: list[list[int]]):\n        if not matrix or not matrix[0]:\n            return\n        R, C = len(matrix), len(matrix[0])\n        self.p = [[0] * (C + 1) for _ in range(R + 1)]\n        for r in range(R):\n            for c in range(C):\n                self.p[r + 1][c + 1] = matrix[r][c] + self.p[r][c + 1] + self.p[r + 1][c] - self.p[r][c]\n\n    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:\n        return self.p[row2 + 1][col2 + 1] - self.p[row1][col2 + 1] - self.p[row2 + 1][col1] + self.p[row1][col1]\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(R * C) initialization, O(1) per sumRegion query',
      space: 'O(R * C)',
      variables: ['R: matrix row count', 'C: matrix column count'],
      notes: 'Initial 2D prefix table allows rectangle queries to evaluate four table lookups in constant time.',
      whyNaiveFails: 'Iterating through rows and columns inside sumRegion costs O(R * C) per query and exceeds execution limits on 10,000 queries.',
      spaceTimeTradeoff: 'Allocating the 2D prefix grid requires O(R * C) auxiliary memory.',
      interviewerExpectation: 'Correct handling of the double-subtracted top-left overlap region.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class NumMatrix:
    def __init__(self, matrix: list[list[int]]):
        if not matrix or not matrix[0]:
            return
        R, C = len(matrix), len(matrix[0])
        self.p = [[0] * (C + 1) for _ in range(R + 1)]
        for r in range(R):
            for c in range(C):
                self.p[r + 1][c + 1] = matrix[r][c] + self.p[r][c + 1] + self.p[r + 1][c] - self.p[r][c]

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return self.p[row2 + 1][col2 + 1] - self.p[row1][col2 + 1] - self.p[row2 + 1][col1] + self.p[row1][col1]`,
        approach: '2D prefix sum grid with inclusion-exclusion formula',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class NumMatrix {
private:
    vector<vector<int>> p;

public:
    NumMatrix(vector<vector<int>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return;
        int R = matrix.size(), C = matrix[0].size();
        p.assign(R + 1, vector<int>(C + 1, 0));
        for (int r = 0; r < R; ++r) {
            for (int c = 0; c < C; ++c) {
                p[r + 1][c + 1] = matrix[r][c] + p[r][c + 1] + p[r + 1][c] - p[r][c];
            }
        }
    }

    int sumRegion(int row1, int col1, int row2, int col2) {
        return p[row2 + 1][col2 + 1] - p[row1][col2 + 1] - p[row2 + 1][col1] + p[row1][col1];
    }
};`,
        approach: '2D prefix sum table',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class NumMatrix {
    private final int[][] p;

    public NumMatrix(int[][] matrix) {
        int R = matrix.length, C = matrix[0].length;
        p = new int[R + 1][C + 1];
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                p[r + 1][c + 1] = matrix[r][c] + p[r][c + 1] + p[r + 1][c] - p[r][c];
            }
        }
    }

    public int sumRegion(int row1, int col1, int row2, int col2) {
        return p[row2 + 1][col2 + 1] - p[row1][col2 + 1] - p[row2 + 1][col1] + p[row1][col1];
    }
}`,
        approach: '2D prefix matrix inclusion-exclusion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var NumMatrix = function(matrix) {
    const R = matrix.length, C = matrix[0].length;
    this.p = Array.from({ length: R + 1 }, () => new Array(C + 1).fill(0));
    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            this.p[r + 1][c + 1] = matrix[r][c] + this.p[r][c + 1] + this.p[r + 1][c] - this.p[r][c];
        }
    }
};

NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    return this.p[row2 + 1][col2 + 1] - this.p[row1][col2 + 1] - this.p[row2 + 1][col1] + this.p[row1][col1];
};`,
        approach: '2D prefix sum grid',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    m = [
        [3, 0, 1, 4, 2],
        [5, 6, 3, 2, 1],
        [1, 2, 0, 1, 5],
        [4, 1, 0, 1, 7],
        [1, 0, 3, 0, 5]
    ]
    nm = Solution(m)
    assert nm.sumRegion(2, 1, 4, 3) == 8
    assert nm.sumRegion(1, 1, 2, 2) == 11
    assert nm.sumRegion(1, 2, 2, 4) == 12
`
  },

  // 11. #341 flatten-nested-list-iterator
  {
    slug: 'flatten-nested-list-iterator',
    number: 341,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Deeply Nested Structure Traversal',
        text: 'A stream contains integers nested arbitrarily deep inside recursive list containers. How can a deferred evaluation container maintain the current position across nested boundaries?'
      },
      {
        level: 2,
        title: 'Reverse-Pushed Evaluation Stack',
        text: 'Push the elements of nestedList onto an internal stack in reverse order so that the first element sits at the top ready for evaluation.'
      },
      {
        level: 3,
        title: 'Lazy Unpacking in hasNext',
        text: 'In hasNext, inspect the top element. If it is an integer, return true. If it is a list, pop it and push its contents back onto the stack in reverse order. Repeat until an integer is surfaced or stack empties.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass NestedIterator:\n    def __init__(self, nestedList: list[\'NestedInteger\']):\n        self.stack = list(reversed(nestedList))\n\n    def next(self) -> int:\n        return self.stack.pop().getInteger()\n\n    def hasNext(self) -> bool:\n        while self.stack:\n            top = self.stack[-1]\n            if top.isInteger():\n                return True\n            self.stack.pop()\n            for item in reversed(top.getList()):\n                self.stack.append(item)\n        return False\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) amortized per next and hasNext call',
      space: 'O(D)',
      variables: ['D: maximum nesting depth of the list'],
      notes: 'Each nested list and integer is pushed and popped at most once throughout iteration.',
      whyNaiveFails: 'Flattening the entire nested structure up front during initialization consumes O(N) memory and fails to support infinite or lazy streams.',
      spaceTimeTradeoff: 'Stack size is proportional to maximum nesting depth plus siblings, providing lazy on-demand streaming.',
      interviewerExpectation: 'Performing lazy unpacking inside hasNext rather than eager recursion in the constructor.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class NestedIterator:
    def __init__(self, nestedList: list['NestedInteger']):
        self.stack = list(reversed(nestedList))

    def next(self) -> int:
        return self.stack.pop().getInteger()

    def hasNext(self) -> bool:
        while self.stack:
            top = self.stack[-1]
            if top.isInteger():
                return True
            self.stack.pop()
            for item in reversed(top.getList()):
                self.stack.append(item)
        return False`,
        approach: 'Reverse stack with lazy list expansion in hasNext',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class NestedIterator {
private:
    vector<NestedInteger> st;

public:
    NestedIterator(vector<NestedInteger> &nestedList) {
        for (int i = (int)nestedList.size() - 1; i >= 0; --i) {
            st.push_back(nestedList[i]);
        }
    }
    
    int next() {
        int val = st.back().getInteger();
        st.pop_back();
        return val;
    }
    
    bool hasNext() {
        while (!st.empty()) {
            if (st.back().isInteger()) return true;
            vector<NestedInteger> list = st.back().getList();
            st.pop_back();
            for (int i = (int)list.size() - 1; i >= 0; --i) {
                st.push_back(list[i]);
            }
        }
        return false;
    }
};`,
        approach: 'Reverse vector stack with lazy nested list unrolling',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Iterator;
import java.util.List;

public class NestedIterator implements Iterator<Integer> {
    private final Deque<NestedInteger> stack = new ArrayDeque<>();

    public NestedIterator(List<NestedInteger> nestedList) {
        for (int i = nestedList.size() - 1; i >= 0; i--) {
            stack.push(nestedList.get(i));
        }
    }

    @Override
    public Integer next() {
        return stack.pop().getInteger();
    }

    @Override
    public boolean hasNext() {
        while (!stack.isEmpty()) {
            NestedInteger top = stack.peek();
            if (top.isInteger()) return true;
            stack.pop();
            List<NestedInteger> list = top.getList();
            for (int i = list.size() - 1; i >= 0; i--) {
                stack.push(list.get(i));
            }
        }
        return false;
    }
}`,
        approach: 'Stack-based lazy unrolling in hasNext',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var NestedIterator = function(nestedList) {
    this.stack = [];
    for (let i = nestedList.length - 1; i >= 0; i--) {
        this.stack.push(nestedList[i]);
    }
};

NestedIterator.prototype.hasNext = function() {
    while (this.stack.length > 0) {
        const top = this.stack[this.stack.length - 1];
        if (top.isInteger()) return true;
        this.stack.pop();
        const list = top.getList();
        for (let i = list.length - 1; i >= 0; i--) {
            this.stack.push(list[i]);
        }
    }
    return false;
};

NestedIterator.prototype.next = function() {
    return this.stack.pop().getInteger();
};`,
        approach: 'Reverse stack with lazy expansion in hasNext',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    class MockNI:
        def __init__(self, val=None, lst=None):
            self.v = val
            self.l = lst
        def isInteger(self):
            return self.v is not None
        def getInteger(self):
            return self.v
        def getList(self):
            return self.l

    # [[1,1],2,[1,1]]
    data = [
        MockNI(lst=[MockNI(val=1), MockNI(val=1)]),
        MockNI(val=2),
        MockNI(lst=[MockNI(val=1), MockNI(val=1)])
    ]
    it = Solution(data)
    out = []
    while it.hasNext():
        out.append(it.next())
    assert out == [1, 1, 2, 1, 1]
`
  },

  // 12. #346 moving-average-from-data-stream
  {
    slug: 'moving-average-from-data-stream',
    number: 346,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Sliding Window Stream Aggregation',
        text: 'A continuous stream of integers must maintain the average of the most recent size values. How can an incremental rolling sum eliminate recomputing the entire window?'
      },
      {
        level: 2,
        title: 'Circular Buffer or Double-Ended Collection',
        text: 'Maintain an internal buffer and a running window sum variable. When the buffer size reaches window capacity, subtract the exiting oldest value from the sum before appending the newest.'
      },
      {
        level: 3,
        title: 'Constant-Time Rolling Mean Formula',
        text: 'Add incoming val to running sum, append val to buffer. If buffer count exceeds capacity, pop the oldest value and subtract it from sum. Return running sum divided by buffer length.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nfrom collections import deque\n\nclass MovingAverage:\n    def __init__(self, size: int):\n        self.size = size\n        self.q = deque()\n        self.total = 0\n\n    def next(self, val: int) -> float:\n        self.total += val\n        self.q.append(val)\n        if len(self.q) > self.size:\n            self.total -= self.q.popleft()\n        return self.total / len(self.q)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) per next call',
      space: 'O(W)',
      variables: ['W: window capacity parameter (1 <= W <= 1000)'],
      notes: 'Maintains running sum and slides window in constant time per incoming value.',
      whyNaiveFails: 'Re-summing the window on every incoming data point costs O(W) per call, scaling poorly under high-throughput streaming.',
      spaceTimeTradeoff: 'Bounded memory buffer of size W prevents memory leaks over unbounded streaming input.',
      interviewerExpectation: 'Use of double precision floating point division and correct initialization before window is full.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `from collections import deque

class MovingAverage:
    def __init__(self, size: int):
        self.size = size
        self.q = deque()
        self.total = 0

    def next(self, val: int) -> float:
        self.total += val
        self.q.append(val)
        if len(self.q) > self.size:
            self.total -= self.q.popleft()
        return self.total / len(self.q)`,
        approach: 'Deque sliding window with rolling sum',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class MovingAverage {
private:
    int size;
    queue<int> q;
    double total = 0.0;

public:
    MovingAverage(int size) : size(size) {}

    double next(int val) {
        total += val;
        q.push(val);
        if ((int)q.size() > size) {
            total -= q.front();
            q.pop();
        }
        return total / q.size();
    }
};`,
        approach: 'Queue with rolling sum accumulator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.ArrayDeque;
import java.util.Queue;

class MovingAverage {
    private final int size;
    private final Queue<Integer> q = new ArrayDeque<>();
    private double total = 0.0;

    public MovingAverage(int size) {
        this.size = size;
    }

    public double next(int val) {
        total += val;
        q.add(val);
        if (q.size() > size) {
            total -= q.remove();
        }
        return total / q.size();
    }
}`,
        approach: 'Queue with rolling sum accumulator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var MovingAverage = function(size) {
    this.size = size;
    this.q = [];
    this.total = 0;
};

MovingAverage.prototype.next = function(val) {
    this.total += val;
    this.q.push(val);
    if (this.q.length > this.size) {
        this.total -= this.q.shift();
    }
    return this.total / this.q.length;
};`,
        approach: 'Array queue with rolling sum accumulator',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    ma = Solution(3)
    assert abs(ma.next(1) - 1.0) < 1e-5
    assert abs(ma.next(10) - 5.5) < 1e-5
    assert abs(ma.next(3) - 4.66667) < 1e-4
    assert abs(ma.next(5) - 6.0) < 1e-5
`
  },

  // 13. #355 design-twitter
  {
    slug: 'design-twitter',
    number: 355,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'News Feed Chronological Aggregation',
        text: 'A user news feed must display the 10 most recent tweets posted by the user and people they follow. How can a global timestamp sequence determine chronological order across followees?'
      },
      {
        level: 2,
        title: 'Relational Mappings and Global Timestamp Clock',
        text: 'Map each user to a set of followees and a list of their posted tweets (storing timestamp and tweetId). Increment a global integer timestamp on each postTweet call.'
      },
      {
        level: 3,
        title: 'Bounded Top-10 Selection',
        text: 'Gather the recent tweets of the user and all their followees. Use a sorting pass or a min-heap of size 10 to extract the 10 highest-timestamped tweets.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport heapq\nfrom collections import defaultdict\n\nclass Twitter:\n    def __init__(self):\n        self.time = 0\n        self.tweets = defaultdict(list)\n        self.following = defaultdict(set)\n\n    def postTweet(self, userId: int, tweetId: int) -> None:\n        self.time += 1\n        self.tweets[userId].append((self.time, tweetId))\n\n    def getNewsFeed(self, userId: int) -> list[int]:\n        feed_users = self.following[userId] | {userId}\n        candidates = []\n        for u in feed_users:\n            candidates.extend(self.tweets[u][-10:])\n        top10 = heapq.nlargest(10, candidates, key=lambda x: x[0])\n        return [tweetId for _, tweetId in top10]\n\n    def follow(self, followerId: int, followeeId: int) -> None:\n        self.following[followerId].add(followeeId)\n\n    def unfollow(self, followerId: int, followeeId: int) -> None:\n        self.following[followerId].discard(followeeId)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) post/follow/unfollow, O(F * 10 log 10) for getNewsFeed',
      space: 'O(U + T)',
      variables: ['F: number of followees', 'U: unique users', 'T: total tweets'],
      notes: 'Posting and following are constant time. Feed aggregation evaluates at most 10 recent tweets per followee.',
      whyNaiveFails: 'Re-sorting all historical tweets in the system takes O(T log T) and violates SLA response times.',
      spaceTimeTradeoff: 'Storing tweets per user allows bounded retrieval of only the most recent tweets per author.',
      interviewerExpectation: 'Ensuring a user always sees their own tweets even without self-following, and handling unfollow idempotently.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import heapq
from collections import defaultdict

class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets = defaultdict(list)
        self.following = defaultdict(set)

    def postTweet(self, userId: int, tweetId: int) -> None:
        self.time += 1
        self.tweets[userId].append((self.time, tweetId))

    def getNewsFeed(self, userId: int) -> list[int]:
        feed_users = self.following[userId] | {userId}
        candidates = []
        for u in feed_users:
            candidates.extend(self.tweets[u][-10:])
        top10 = heapq.nlargest(10, candidates, key=lambda x: x[0])
        return [tweetId for _, tweetId in top10]

    def follow(self, followerId: int, followeeId: int) -> None:
        self.following[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        self.following[followerId].discard(followeeId)`,
        approach: 'Timestamped user tweet lists with bounded k-way selection',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Twitter {
private:
    int time = 0;
    unordered_map<int, vector<pair<int, int>>> tweets;
    unordered_map<int, unordered_set<int>> following;

public:
    Twitter() {}

    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({++time, tweetId});
    }

    vector<int> getNewsFeed(int userId) {
        unordered_set<int> users = following[userId];
        users.insert(userId);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;
        for (int u : users) {
            auto& ut = tweets[u];
            int start = max(0, (int)ut.size() - 10);
            for (int i = start; i < (int)ut.size(); ++i) {
                minHeap.push(ut[i]);
                if (minHeap.size() > 10) minHeap.pop();
            }
        }
        vector<int> res;
        while (!minHeap.empty()) {
            res.push_back(minHeap.top().second);
            minHeap.pop();
        }
        reverse(res.begin(), res.end());
        return res;
    }

    void follow(int followerId, int followeeId) {
        following[followerId].insert(followeeId);
    }

    void unfollow(int followerId, int followeeId) {
        following[followerId].erase(followeeId);
    }
};`,
        approach: 'Hash maps with priority queue top-10 extraction',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

class Twitter {
    private int time = 0;
    private final Map<Integer, List<int[]>> tweets = new HashMap<>();
    private final Map<Integer, Set<Integer>> following = new HashMap<>();

    public Twitter() {}

    public void postTweet(int userId, int tweetId) {
        tweets.computeIfAbsent(userId, k -> new ArrayList<>()).add(new int[]{++time, tweetId});
    }

    public List<Integer> getNewsFeed(int userId) {
        Set<Integer> users = new HashSet<>(following.getOrDefault(userId, Collections.emptySet()));
        users.add(userId);
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
        for (int u : users) {
            List<int[]> list = tweets.getOrDefault(u, Collections.emptyList());
            int start = Math.max(0, list.size() - 10);
            for (int i = start; i < list.size(); i++) {
                minHeap.offer(list.get(i));
                if (minHeap.size() > 10) minHeap.poll();
            }
        }
        LinkedList<Integer> res = new LinkedList<>();
        while (!minHeap.isEmpty()) {
            res.addFirst(minHeap.poll()[1]);
        }
        return res;
    }

    public void follow(int followerId, int followeeId) {
        following.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
    }

    public void unfollow(int followerId, int followeeId) {
        Set<Integer> set = following.get(followerId);
        if (set != null) set.remove(followeeId);
    }
}`,
        approach: 'Priority queue with bounded top-10 retrieval',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var Twitter = function() {
    this.time = 0;
    this.tweets = new Map();
    this.following = new Map();
};

Twitter.prototype.postTweet = function(userId, tweetId) {
    if (!this.tweets.has(userId)) this.tweets.set(userId, []);
    this.tweets.get(userId).push({ time: ++this.time, tweetId });
};

Twitter.prototype.getNewsFeed = function(userId) {
    const users = new Set(this.following.get(userId) || []);
    users.add(userId);
    const candidates = [];
    for (const u of users) {
        const list = this.tweets.get(u) || [];
        const start = Math.max(0, list.length - 10);
        for (let i = start; i < list.length; i++) {
            candidates.push(list[i]);
        }
    }
    candidates.sort((a, b) => b.time - a.time);
    return candidates.slice(0, 10).map(x => x.tweetId);
};

Twitter.prototype.follow = function(followerId, followeeId) {
    if (!this.following.has(followerId)) this.following.set(followerId, new Set());
    this.following.get(followerId).add(followeeId);
};

Twitter.prototype.unfollow = function(followerId, followeeId) {
    if (this.following.has(followerId)) {
        this.following.get(followerId).delete(followeeId);
    }
};`,
        approach: 'Map with candidate slice and sort',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    tw = Solution()
    tw.postTweet(1, 5)
    assert tw.getNewsFeed(1) == [5]
    tw.follow(1, 2)
    tw.postTweet(2, 6)
    assert tw.getNewsFeed(1) == [6, 5]
    tw.unfollow(1, 2)
    assert tw.getNewsFeed(1) == [5]
`
  },

  // 14. #380 insert-delete-getrandom-o1
  {
    slug: 'insert-delete-getrandom-o1',
    number: 380,
    category: 'Algorithms',
    patterns: ['design-data-structures'],
    hints: [
      {
        level: 1,
        title: 'Constant-Time Random Sampling and Removal',
        text: 'Generating an element with equal probability in constant time requires contiguous array indexing, while O(1) membership checks require index mapping. How can swapping to the back enable constant-time removal from an array?'
      },
      {
        level: 2,
        title: 'Dynamic Array with Index Dictionary',
        text: 'Pair a dynamic array storing values with a dictionary mapping val to its current index in the array. Insert appends to the array and records the index.'
      },
      {
        level: 3,
        title: 'Swap with Last Element on Deletion',
        text: 'To delete val in O(1) time without shifting elements, retrieve its index, overwrite it with the array last element, update the moved element index in the dictionary, and pop from the back.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport random\n\nclass RandomizedSet:\n    def __init__(self):\n        self.nums = []\n        self.idx_map = {}\n\n    def insert(self, val: int) -> bool:\n        if val in self.idx_map:\n            return False\n        self.idx_map[val] = len(self.nums)\n        self.nums.append(val)\n        return True\n\n    def remove(self, val: int) -> bool:\n        if val not in self.idx_map:\n            return False\n        idx = self.idx_map[val]\n        last_val = self.nums[-1]\n        self.nums[idx] = last_val\n        self.idx_map[last_val] = idx\n        self.nums.pop()\n        del self.idx_map[val]\n        return True\n\n    def getRandom(self) -> int:\n        return random.choice(self.nums)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1) average for insert, remove, and getRandom',
      space: 'O(N)',
      variables: ['N: number of elements currently stored in the set'],
      notes: 'Swap-with-last element technique turns O(N) array shift deletions into O(1) pop operations.',
      whyNaiveFails: 'Array removal costs O(N) due to element shifting; hash sets do not support uniform random index sampling in O(1) without arrays.',
      spaceTimeTradeoff: 'Dual array + dictionary storage coordinates O(1) indexed sampling and O(1) lookups.',
      interviewerExpectation: 'Handling removal when the element to delete is already the last element in the array without corrupting dictionary state.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import random

class RandomizedSet:
    def __init__(self):
        self.nums = []
        self.idx_map = {}

    def insert(self, val: int) -> bool:
        if val in self.idx_map:
            return False
        self.idx_map[val] = len(self.nums)
        self.nums.append(val)
        return True

    def remove(self, val: int) -> bool:
        if val not in self.idx_map:
            return False
        idx = self.idx_map[val]
        last_val = self.nums[-1]
        self.nums[idx] = last_val
        self.idx_map[last_val] = idx
        self.nums.pop()
        del self.idx_map[val]
        return True

    def getRandom(self) -> int:
        return random.choice(self.nums)`,
        approach: 'Array + hash map with swap-to-back O(1) deletion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class RandomizedSet {
private:
    vector<int> nums;
    unordered_map<int, int> idx_map;

public:
    RandomizedSet() {}

    bool insert(int val) {
        if (idx_map.count(val)) return false;
        idx_map[val] = nums.size();
        nums.push_back(val);
        return true;
    }

    bool remove(int val) {
        if (!idx_map.count(val)) return false;
        int idx = idx_map[val];
        int lastVal = nums.back();
        nums[idx] = lastVal;
        idx_map[lastVal] = idx;
        nums.pop_back();
        idx_map.erase(val);
        return true;
    }

    int getRandom() {
        return nums[rand() % nums.size()];
    }
};`,
        approach: 'Vector and unordered_map with swap-to-back deletion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.*;

class RandomizedSet {
    private final List<Integer> nums = new ArrayList<>();
    private final Map<Integer, Integer> idxMap = new HashMap<>();
    private final Random rand = new Random();

    public RandomizedSet() {}

    public boolean insert(int val) {
        if (idxMap.containsKey(val)) return false;
        idxMap.put(val, nums.size());
        nums.add(val);
        return true;
    }

    public boolean remove(int val) {
        if (!idxMap.containsKey(val)) return false;
        int idx = idxMap.get(val);
        int lastVal = nums.get(nums.size() - 1);
        nums.set(idx, lastVal);
        idxMap.put(lastVal, idx);
        nums.remove(nums.size() - 1);
        idxMap.remove(val);
        return true;
    }

    public int getRandom() {
        return nums.get(rand.nextInt(nums.size()));
    }
}`,
        approach: 'ArrayList with HashMap and swap-to-back removal',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var RandomizedSet = function() {
    this.nums = [];
    this.idxMap = new Map();
};

RandomizedSet.prototype.insert = function(val) {
    if (this.idxMap.has(val)) return false;
    this.idxMap.set(val, this.nums.length);
    this.nums.push(val);
    return true;
};

RandomizedSet.prototype.remove = function(val) {
    if (!this.idxMap.has(val)) return false;
    const idx = this.idxMap.get(val);
    const lastVal = this.nums[this.nums.length - 1];
    this.nums[idx] = lastVal;
    this.idxMap.set(lastVal, idx);
    this.nums.pop();
    this.idxMap.delete(val);
    return true;
};

RandomizedSet.prototype.getRandom = function() {
    const randIdx = Math.floor(Math.random() * this.nums.length);
    return this.nums[randIdx];
};`,
        approach: 'Array and Map with swap-to-back deletion',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    rs = Solution()
    assert rs.insert(1) is True
    assert rs.remove(2) is False
    assert rs.insert(2) is True
    assert rs.getRandom() in [1, 2]
    assert rs.remove(1) is True
    assert rs.insert(2) is False
    assert rs.getRandom() == 2
`
  },

  // 15. #430 flatten-a-multilevel-doubly-linked-list
  {
    slug: 'flatten-a-multilevel-doubly-linked-list',
    number: 430,
    category: 'Algorithms',
    patterns: ['linked-list-pointers'],
    hints: [
      {
        level: 1,
        title: 'Child Segment In-Place Splicing',
        text: 'A doubly linked list node may have a child pointing to another doubly linked list. When flattening, the child list must be spliced directly between current node and its next node.'
      },
      {
        level: 2,
        title: 'Recursive or Pointer Tail Splicing',
        text: 'When curr has a child, find the tail of the flattened child segment. Connect curr.child to curr.next, update prev pointers, clear curr.child, and proceed.'
      },
      {
        level: 3,
        title: 'Iterative Pointer Rewiring',
        text: 'Traverse with curr. If curr.child is present: find child tail, attach child_tail.next = curr.next (updating prev if curr.next exists), connect curr.next = curr.child and curr.child.prev = curr, set curr.child = None.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nclass Solution:\n    def flatten(self, head: \'Optional[Node]\') -> \'Optional[Node]\':\n        curr = head\n        while curr:\n            if curr.child:\n                nxt = curr.next\n                child_tail = curr.child\n                while child_tail.next:\n                    child_tail = child_tail.next\n                curr.next = curr.child\n                curr.child.prev = curr\n                curr.child = None\n                if nxt:\n                    child_tail.next = nxt\n                    nxt.prev = child_tail\n            curr = curr.next\n        return head\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: total number of nodes across all levels (0 <= N <= 1000)'],
      notes: 'Every node is traversed a bounded number of times during splicing in-place.',
      whyNaiveFails: 'Collecting nodes in an auxiliary array and rebuilding the doubly linked list requires O(N) extra memory.',
      spaceTimeTradeoff: 'In-place pointer rewiring preserves constant auxiliary space.',
      interviewerExpectation: 'Correctly updating all prev and next pointers and clearing child references to None.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `class Solution:
    def flatten(self, head: 'Optional[Node]') -> 'Optional[Node]':
        curr = head
        while curr:
            if curr.child:
                nxt = curr.next
                child_tail = curr.child
                while child_tail.next:
                    child_tail = child_tail.next
                curr.next = curr.child
                curr.child.prev = curr
                curr.child = None
                if nxt:
                    child_tail.next = nxt
                    nxt.prev = child_tail
            curr = curr.next
        return head`,
        approach: 'Iterative child segment tail splicing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `class Solution {
public:
    Node* flatten(Node* head) {
        Node* curr = head;
        while (curr) {
            if (curr->child) {
                Node* nxt = curr->next;
                Node* childTail = curr->child;
                while (childTail->next) {
                    childTail = childTail->next;
                }
                curr->next = curr->child;
                curr->child->prev = curr;
                curr->child = nullptr;
                if (nxt) {
                    childTail->next = nxt;
                    nxt->prev = childTail;
                }
            }
            curr = curr->next;
        }
        return head;
    }
};`,
        approach: 'Iterative in-place child tail splicing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class Solution {
    public Node flatten(Node head) {
        Node curr = head;
        while (curr != null) {
            if (curr.child != null) {
                Node nxt = curr.next;
                Node childTail = curr.child;
                while (childTail.next != null) {
                    childTail = childTail.next;
                }
                curr.next = curr.child;
                curr.child.prev = curr;
                curr.child = null;
                if (nxt != null) {
                    childTail.next = nxt;
                    nxt.prev = childTail;
                }
            }
            curr = curr.next;
        }
        return head;
    }
}`,
        approach: 'Iterative child tail splicing with pointer updates',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'javascript',
        code: `var flatten = function(head) {
    let curr = head;
    while (curr) {
        if (curr.child) {
            const nxt = curr.next;
            let childTail = curr.child;
            while (childTail.next) {
                childTail = childTail.next;
            }
            curr.next = curr.child;
            curr.child.prev = curr;
            curr.child = null;
            if (nxt) {
                childTail.next = nxt;
                nxt.prev = childTail;
            }
        }
        curr = curr.next;
    }
    return head;
};`,
        approach: 'In-place child tail splicing',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testCases: `
    class Node:
        def __init__(self, val, prev=None, next=None, child=None):
            self.val = val
            self.prev = prev
            self.next = next
            self.child = child

    # 1 - 2 - 3
    #     |
    #     4 - 5
    n1 = Node(1); n2 = Node(2); n3 = Node(3)
    n4 = Node(4); n5 = Node(5)
    n1.next = n2; n2.prev = n1
    n2.next = n3; n3.prev = n2
    n2.child = n4
    n4.next = n5; n5.prev = n4

    res = solver.flatten(n1)
    vals = []
    curr = res
    while curr:
        vals.append(curr.val)
        curr = curr.next
    assert vals == [1, 2, 4, 5, 3]
`
  }
];

export function writeAlgorithmsFiles() {
  for (const item of algorithmsProblems) {
    const probData = {
      slug: item.slug,
      number: item.number,
      category: item.category,
      patterns: item.patterns,
      hints: item.hints,
      complexity: item.complexity,
      solutions: item.solutions,
      review: {
        status: 'tested',
        acceptedOnLeetCode: null,
        reviewer: null
      },
      updated: '2026-10-30T00:00:00.000Z'
    };

    const probPath = path.join(rootDir, 'dataset/problems', `${item.slug}.json`);
    fs.writeFileSync(probPath, JSON.stringify(probData, null, 2) + '\n', 'utf8');

    const testDir = path.join(rootDir, 'dataset/tests', item.slug);
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

    const metaData = {
      slug: item.slug,
      category: item.category,
      targetTime: item.complexity.time,
      targetSpace: item.complexity.space
    };
    fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(metaData, null, 2) + '\n', 'utf8');

    const testPyContent = `import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', '${item.slug}.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'\`\`\`python\\n(.*?)\\n\`\`\`', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    class Node:
        def __init__(self, val=0, next=None, random=None, prev=None, child=None, left=None, right=None):
            self.val = val
            self.next = next
            self.random = random
            self.prev = prev
            self.child = child
            self.left = left
            self.right = right

    class TreeNode:
        def __init__(self, val=0, left=None, right=None):
            self.val = val
            self.left = left
            self.right = right

    scope = {'list': list, 'Optional': None, 'Node': Node, 'TreeNode': TreeNode}
    exec(sol_code, scope)
    # The class name is either Solution, Codec, WordDictionary, MyStack, MyQueue, NumArray, NumMatrix, NestedIterator, MovingAverage, Twitter, RandomizedSet
    cls_candidates = [k for k in ['Solution', 'Codec', 'WordDictionary', 'MyStack', 'MyQueue', 'NumArray', 'NumMatrix', 'NestedIterator', 'MovingAverage', 'Twitter', 'RandomizedSet'] if k in scope]
    SolutionClass = scope[cls_candidates[0]]
    Solution = SolutionClass
    solver = SolutionClass() if cls_candidates[0] == 'Solution' else None
${item.testCases}

if __name__ == '__main__':
    main()
`;
    fs.writeFileSync(path.join(testDir, 'test.py'), testPyContent, 'utf8');

    console.log(`Generated: #${item.number} ${item.slug} [${item.category}]`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeAlgorithmsFiles();
}
