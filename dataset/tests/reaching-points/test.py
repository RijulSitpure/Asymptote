class Solution:
    def reachingPoints(self, sx: int, sy: int, tx: int, ty: int) -> bool:
        while tx >= sx and ty >= sy:
            if tx == ty:
                break
            if tx > ty:
                if ty > sy:
                    tx %= ty
                else:
                    return (tx - sx) % ty == 0
            else:
                if tx > sx:
                    ty %= tx
                else:
                    return (ty - sy) % tx == 0
        return tx == sx and ty == sy

def test():
    sol = Solution()
    assert sol.reachingPoints(1, 1, 3, 5) is True, "test 1 failed"
    assert sol.reachingPoints(1, 1, 2, 2) is False, "test 2 failed"
    assert sol.reachingPoints(1, 1, 1, 1) is True, "test 3 failed"
    print("✓ reaching-points passed")

if __name__ == "__main__":
    test()
