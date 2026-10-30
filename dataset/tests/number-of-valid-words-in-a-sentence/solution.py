class Solution:
    def countValidWords(self, sentence: str) -> int:
        def is_valid(token: str) -> bool:
            if not token:
                return False
            hyphen_count = 0
            n = len(token)
            for i, ch in enumerate(token):
                if ch.isdigit():
                    return False
                if ch == '-':
                    hyphen_count += 1
                    if hyphen_count > 1:
                        return False
                    if i == 0 or i == n - 1:
                        return False
                    if not token[i - 1].isalpha() or not token[i + 1].isalpha():
                        return False
                elif ch in '!.,':
                    if i != n - 1:
                        return False
            return True

        return sum(1 for token in sentence.split() if is_valid(token))
