import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'encode-and-decode-tinyurl.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    codec = scope['Codec']()

    url = 'https://leetcode.com/problems/design-tinyurl'
    short = codec.encode(url)
    assert short.startswith('http://tinyurl.com/')
    assert codec.decode(short) == url
    print("✓ encode-and-decode-tinyurl passed")

if __name__ == '__main__':
    main()
