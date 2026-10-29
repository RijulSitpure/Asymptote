import json, os, re, random, time

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-twitter.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_hint_code(prob):
    m = re.search(r'```python\n(.*?)\n```', prob['hints'][3]['text'], re.DOTALL)
    if not m: raise ValueError("Could not extract Python code")
    return m.group(1)

def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']
    hint_code = extract_hint_code(prob)
    assert sol_code.strip() == hint_code.strip(), "Hint 4 code must match solution code"

    class Node:
        def __init__(self, val=0, next=None, random=None, prev=None, child=None, left=None, right=None):
            self.val = val
            self.next = next
            self.random = random
            self.prev = prev
            self.child = child
            self.left = left
            self.right = right

    class TreeNode:
        def __init__(self, val=0, left=None, right=None):
            self.val = val
            self.left = left
            self.right = right

    scope = {'list': list, 'Optional': None, 'Node': Node, 'TreeNode': TreeNode}
    exec(sol_code, scope)
    # The class name is either Solution, Codec, WordDictionary, MyStack, MyQueue, NumArray, NumMatrix, NestedIterator, MovingAverage, Twitter, RandomizedSet
    cls_candidates = [k for k in ['Solution', 'Codec', 'WordDictionary', 'MyStack', 'MyQueue', 'NumArray', 'NumMatrix', 'NestedIterator', 'MovingAverage', 'Twitter', 'RandomizedSet'] if k in scope]
    SolutionClass = scope[cls_candidates[0]]
    Solution = SolutionClass
    solver = SolutionClass() if cls_candidates[0] == 'Solution' else None

    tw = Solution()
    tw.postTweet(1, 5)
    assert tw.getNewsFeed(1) == [5]
    tw.follow(1, 2)
    tw.postTweet(2, 6)
    assert tw.getNewsFeed(1) == [6, 5]
    tw.unfollow(1, 2)
    assert tw.getNewsFeed(1) == [5]


if __name__ == '__main__':
    main()
