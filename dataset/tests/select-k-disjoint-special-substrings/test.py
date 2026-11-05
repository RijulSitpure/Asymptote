
class Solution:
    def maxSubstringLength(self, s: str, k: int) -> bool:
        if k == 0:
            return True
        n = len(s)
        first = {}
        last = {}
        for i, ch in enumerate(s):
            if ch not in first:
                first[ch] = i
            last[ch] = i
        
        intervals = []
        for ch in first:
            start = first[ch]
            end = last[ch]
            valid = True
            j = start
            while j <= end:
                c = s[j]
                if first[c] < start:
                    valid = False
                    break
                end = max(end, last[c])
                j += 1
            if valid and not (start == 0 and end == n - 1):
                intervals.append((start, end))
        
        intervals.sort(key=lambda x: x[1])
        count = 0
        prev_end = -1
        for start, end in intervals:
            if start > prev_end:
                count += 1
                prev_end = end
        return count >= k

def test_select_k_disjoint_special_substrings():
    sol = Solution()
    assert sol.maxSubstringLength("abcdbaefab", 2) == True
    assert sol.maxSubstringLength("cdefdc", 3) == False
    assert sol.maxSubstringLength("abeab", 0) == True

if __name__ == '__main__':
    test_select_k_disjoint_special_substrings()
    print('All tests passed.')
