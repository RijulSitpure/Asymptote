import collections
import math

class Solution:
    def smallestPalindrome(self, s: str, k: int) -> str:
        count = collections.Counter(s)
        odd_count = sum(1 for freq in count.values() if freq % 2 == 1)
        if odd_count > 1:
            return ""

        half_count = [0] * 26
        mid_letter = ""
        for c, freq in count.items():
            idx = ord(c) - ord('a')
            half_count[idx] = freq // 2
            if freq % 2 == 1:
                mid_letter = c

        def count_arrangements(counts: list[int]) -> int:
            total = sum(counts)
            res = math.factorial(total)
            for freq in counts:
                res //= math.factorial(freq)
            return res

        total_perm = count_arrangements(half_count)
        if k > total_perm:
            return ""

        half_len = sum(half_count)
        left = []
        for _ in range(half_len):
            for i in range(26):
                if half_count[i] == 0:
                    continue
                half_count[i] -= 1
                arrangements = count_arrangements(half_count)
                if arrangements >= k:
                    left.append(chr(i + ord('a')))
                    break
                else:
                    k -= arrangements
                    half_count[i] += 1
        left_str = "".join(left)
        return left_str + mid_letter + left_str[::-1]

def run_tests():
    s = Solution()
    assert s.smallestPalindrome("bbaa", 1) == "abba"
    assert s.smallestPalindrome("bbaa", 2) == "baab"
    assert s.smallestPalindrome("bbaa", 3) == ""
    print("All tests passed for smallest-palindromic-rearrangement-ii")

if __name__ == '__main__':
    run_tests()
