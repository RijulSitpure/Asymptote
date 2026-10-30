from collections import defaultdict

class Solution:
    def largestWordCount(self, messages: list[str], senders: list[str]) -> str:
        total_words = defaultdict(int)
        for msg, sender in zip(messages, senders):
            words = msg.count(" ") + 1
            total_words[sender] += words
        return max(total_words.keys(), key=lambda s: (total_words[s], s))
