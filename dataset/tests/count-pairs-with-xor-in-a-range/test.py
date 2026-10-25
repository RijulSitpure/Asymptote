class TrieNode:
    def __init__(self):
        self.children = [None, None]
        self.count = 0

class Solution:
    def countPairs(self, nums: list[int], low: int, high: int) -> int:
        def count_less_equal(k: int) -> int:
            root = TrieNode()
            total = 0
            for num in nums:
                node = root
                ans = 0
                for bit in range(15, -1, -1):
                    if not node:
                        break
                    b = (num >> bit) & 1
                    kb = (k >> bit) & 1
                    if kb == 1:
                        if node.children[b]:
                            ans += node.children[b].count
                        node = node.children[1 - b]
                    else:
                        node = node.children[b]
                if node:
                    ans += node.count
                total += ans

                curr = root
                for bit in range(15, -1, -1):
                    b = (num >> bit) & 1
                    if not curr.children[b]:
                        curr.children[b] = TrieNode()
                    curr = curr.children[b]
                    curr.count += 1
            return total

        return count_less_equal(high) - count_less_equal(low - 1)

def test():
    sol = Solution()
    assert sol.countPairs([1,4,2,7], 2, 6) == 6
    assert sol.countPairs([9,8,4,2,1], 5, 14) == 8

if __name__ == '__main__':
    test()
