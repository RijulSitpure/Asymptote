class Solution:
    def minOperations(self, logs: list[str]) -> int:
        depth = 0
        for log in logs:
            if log == "../":
                depth = max(0, depth - 1)
            elif log != "./":
                depth += 1
        return depth

def test():
    sol = Solution()
    assert sol.minOperations(["d1/","d2/","../","d21/","./"]) == 2
    assert sol.minOperations(["d1/","d2/","./","d3/","../","d31/"]) == 3
    assert sol.minOperations(["d1/","../","../","../"]) == 0

    print("✓ crawler-log-folder passed")

if __name__ == '__main__':
    test()
