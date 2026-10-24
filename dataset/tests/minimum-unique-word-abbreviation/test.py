import re
from typing import List

class Solution:
    def minAbbreviation(self, target: str, dictionary: List[str]) -> str:
        m = len(target)
        diffs = []
        for word in dictionary:
            if len(word) != m:
                continue
            mask = 0
            for i in range(m):
                if target[i] != word[i]:
                    mask |= (1 << (m - 1 - i))
            diffs.append(mask)

        if not diffs:
            return str(m)

        min_len = m
        best_mask = (1 << m) - 1

        def is_valid(mask: int) -> bool:
            return all((mask & d) != 0 for d in diffs)

        def dfs(idx: int, curr_mask: int, length: int, prev_zero: bool):
            nonlocal min_len, best_mask
            if length >= min_len:
                return
            if idx == m:
                if is_valid(curr_mask):
                    min_len = length
                    best_mask = curr_mask
                return
            dfs(idx + 1, curr_mask | (1 << (m - 1 - idx)), length + 1, False)
            dfs(idx + 1, curr_mask, length + (0 if prev_zero else 1), True)

        dfs(0, 0, 0, False)

        res = []
        zero_count = 0
        for i in range(m):
            if (best_mask >> (m - 1 - i)) & 1:
                if zero_count > 0:
                    res.append(str(zero_count))
                    zero_count = 0
                res.append(target[i])
            else:
                zero_count += 1
        if zero_count > 0:
            res.append(str(zero_count))
        return "".join(res)

def check_abbr(target, abbr, dictionary):
    pat = re.sub(r'(\d+)', lambda m: '.' * int(m.group(1)), abbr)
    assert re.fullmatch(pat, target), f"{abbr} does not match {target}"
    for w in dictionary:
        if len(w) == len(target):
            assert not re.fullmatch(pat, w), f"{abbr} unexpectedly matches {w}"

def test():
    sol = Solution()
    res1 = sol.minAbbreviation("apple", ["blade"])
    check_abbr("apple", res1, ["blade"])
    assert len(res1) <= 2, "test 1 length suboptimal"

    res2 = sol.minAbbreviation("apple", ["plain","amber","blind"])
    check_abbr("apple", res2, ["plain","amber","blind"])
    assert len(res2) <= 3, "test 2 length suboptimal"
    print("✓ minimum-unique-word-abbreviation passed")

if __name__ == "__main__":
    test()
