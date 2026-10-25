class Solution:
    def decode(self, encoded: list[int]) -> list[int]:
        n = len(encoded) + 1
        total_xor = 0
        for i in range(1, n + 1):
            total_xor ^= i
        odd_xor = 0
        for i in range(1, len(encoded), 2):
            odd_xor ^= encoded[i]
        first = total_xor ^ odd_xor
        perm = [first]
        for x in encoded:
            perm.append(perm[-1] ^ x)
        return perm

def test():
    sol = Solution()
    assert sol.decode([3,1]) == [1,2,3]
    assert sol.decode([6,5,4,6]) == [2,4,1,5,3]

    print("✓ decode-xored-permutation passed")

if __name__ == '__main__':
    test()
