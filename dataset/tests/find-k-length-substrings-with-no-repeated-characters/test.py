class Solution:
    def numKLenSubstrNoRepeats(self, s: str, k: int) -> int:
        if k > 26 or k > len(s):
            return 0
        
        freq = {}
        for i in range(k):
            freq[s[i]] = freq.get(s[i], 0) + 1
        
        count = 1 if len(freq) == k else 0
        for i in range(k, len(s)):
            freq[s[i]] = freq.get(s[i], 0) + 1
            left = s[i - k]
            freq[left] -= 1
            if freq[left] == 0:
                del freq[left]
            if len(freq) == k:
                count += 1
        return count

def test():
    sol = Solution()
    assert sol.numKLenSubstrNoRepeats("havefunonleetcode", 5) == 6, "test 1 failed"
    assert sol.numKLenSubstrNoRepeats("home", 5) == 0, "test 2 failed"
    print("✓ find-k-length-substrings-with-no-repeated-characters passed")

if __name__ == "__main__":
    test()
