class Solution:
    def maxLength(self, arr: list[str]) -> int:
        masks = [0]
        for s in arr:
            mask = 0
            dup = False
            for c in s:
                bit = 1 << (ord(c) - ord('a'))
                if mask & bit:
                    dup = True
                    break
                mask |= bit
            if dup:
                continue
            for m in list(masks):
                if (m & mask) == 0:
                    masks.append(m | mask)
        return max(bin(m).count('1') for m in masks)

def test():
    sol = Solution()
    assert sol.maxLength(["un","iq","ue"]) == 4, "test 1 failed"
    assert sol.maxLength(["cha","r","act","ers"]) == 6, "test 2 failed"
    assert sol.maxLength(["abcdefghijklmnopqrstuvwxyz"]) == 26, "test 3 failed"
    print("✓ maximum-length-of-a-concatenated-string-with-unique-characters passed")

if __name__ == "__main__":
    test()
