import json, os, re

def load_problem():
    base = os.path.dirname(os.path.abspath(__file__))
    prob_path = os.path.join(base, '..', '..', 'problems', 'design-log-storage-system.json')
    with open(prob_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def main():
    prob = load_problem()
    sol_code = prob['solutions'][0]['code']

    scope = {}
    exec(sol_code, scope)
    logs = scope['LogSystem']()

    logs.put(1, "2017:01:01:23:59:59")
    logs.put(2, "2017:01:01:22:59:59")
    logs.put(3, "2016:01:01:00:00:00")
    assert logs.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Year") == [1, 2, 3]
    assert logs.retrieve("2016:01:01:01:01:01", "2017:01:01:23:00:00", "Hour") == [1, 2]
    print("✓ design-log-storage-system passed")

if __name__ == '__main__':
    main()
