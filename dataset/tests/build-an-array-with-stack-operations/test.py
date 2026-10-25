class Solution:
    def buildArray(self, target: list[int], n: int) -> list[str]:
        ops = []
        target_set = set(target)
        max_val = target[-1]
        for x in range(1, max_val + 1):
            ops.append("Push")
            if x not in target_set:
                ops.append("Pop")
        return ops

def test():
    sol = Solution()
    assert sol.buildArray([1,3], 3) == ["Push","Push","Pop","Push"], "test 1 failed"
    assert sol.buildArray([1,2,3], 3) == ["Push","Push","Push"], "test 2 failed"
    assert sol.buildArray([1,2], 4) == ["Push","Push"], "test 3 failed"
    print("✓ build-an-array-with-stack-operations passed")

if __name__ == "__main__":
    test()
