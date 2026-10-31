class Solution:
    def getKthCharacter(self, root: Optional[object], k: int) -> str:
        def get_len(node):
            if not node:
                return 0
            if node.len > 0:
                return node.len
            return len(node.val)
        curr = root
        while curr:
            if curr.len == 0:
                return curr.val[k - 1]
            left_len = get_len(curr.left)
            if k <= left_len:
                curr = curr.left
            else:
                k -= left_len
                curr = curr.right
        return ''
