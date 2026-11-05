class Solution:
    def reportSpam(self, message: list[str], bannedWords: list[str]) -> bool:
        banned_set = set(bannedWords)
        count = 0
        for w in message:
            if w in banned_set:
                count += 1
                if count >= 2:
                    return True
        return False
