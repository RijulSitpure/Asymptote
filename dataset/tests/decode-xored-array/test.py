class Solution:
    def decode(self, encoded: list[int], first: int) -> list[int]:
        res = [first]
        for x in encoded:
            res.append(res[-1] ^ x)
        return res

def test():
    sol = Solution()
    assert sol.decode([1,2,3], 1) == [1,0,2,1]
    assert sol.decode([6,2,7,3], 4) == [4,2,0,7,4]

    print("✓ decode-xored-array passed")

if __name__ == '__main__':
    test()
