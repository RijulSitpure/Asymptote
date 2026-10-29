class Solution:
    def isSolvable(self, words: list[str], result: str) -> bool:
        words = [w[::-1] for w in words]
        result = result[::-1]
        max_len = max(max(len(w) for w in words), len(result))
        if len(result) < max(len(w) for w in words):
            return False
        non_zero = set()
        for w in words:
            if len(w) > 1: non_zero.add(w[-1])
        if len(result) > 1: non_zero.add(result[-1])

        letter_to_digit = {}
        used_digits = [False] * 10

        def dfs(col, word_idx, carry):
            if col == max_len:
                return carry == 0
            if word_idx == len(words):
                res_char = result[col] if col < len(result) else None
                val = carry % 10
                nxt_carry = carry // 10
                if res_char is None:
                    return val == 0 and dfs(col + 1, 0, nxt_carry)
                if res_char in letter_to_digit:
                    if letter_to_digit[res_char] != val:
                        return False
                    return dfs(col + 1, 0, nxt_carry)
                else:
                    if used_digits[val] or (val == 0 and res_char in non_zero):
                        return False
                    letter_to_digit[res_char] = val
                    used_digits[val] = True
                    if dfs(col + 1, 0, nxt_carry):
                        return True
                    del letter_to_digit[res_char]
                    used_digits[val] = False
                    return False

            w = words[word_idx]
            if col >= len(w):
                return dfs(col, word_idx + 1, carry)
            ch = w[col]
            if ch in letter_to_digit:
                return dfs(col, word_idx + 1, carry + letter_to_digit[ch])
            for d in range(10):
                if not used_digits[d]:
                    if d == 0 and ch in non_zero:
                        continue
                    letter_to_digit[ch] = d
                    used_digits[d] = True
                    if dfs(col, word_idx + 1, carry + d):
                        return True
                    del letter_to_digit[ch]
                    used_digits[d] = False
            return False

        return dfs(0, 0, 0)

sol = Solution()
assert sol.isSolvable(["SEND","MORE"], "MONEY") == True
assert sol.isSolvable(["SIX","SEVEN","SEVEN"], "TWENTY") == True
assert sol.isSolvable(["LEET","CODE"], "POINT") == False
print("All tests passed successfully.")
