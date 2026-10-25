class Solution:
    def minPartitions(self, n: str) -> int:
        return int(max(n))

def test():
    sol = Solution()
    assert sol.minPartitions("32") == 3
    assert sol.minPartitions("82734") == 8
    assert sol.minPartitions("27346209830709182346") == 9

    print("✓ partitioning-into-minimum-number-of-deci-binary-numbers passed")

if __name__ == '__main__':
    test()
