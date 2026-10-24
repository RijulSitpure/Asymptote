class Solution:
    def pathInZigZagTree(self, label: int) -> list[int]:
        res = []
        curr = label
        while curr >= 1:
            res.append(curr)
            depth = curr.bit_length()
            min_val = 1 << (depth - 1)
            max_val = (1 << depth) - 1
            curr = (min_val + max_val - curr) // 2
        return res[::-1]

def test():
    sol = Solution()
    assert sol.pathInZigZagTree(14) == [1, 3, 4, 14], "test 1 failed"
    assert sol.pathInZigZagTree(26) == [1, 2, 6, 10, 26], "test 2 failed"
    print("✓ path-in-zigzag-labelled-binary-tree passed")

if __name__ == "__main__":
    test()
