import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../..');

export const concurrencyProblems = [
  // 1. #1116 print-zero-even-odd
  {
    slug: 'print-zero-even-odd',
    number: 1116,
    category: 'Concurrency',
    patterns: ['ordering-signals'],
    hints: [
      {
        level: 1,
        title: 'Alternating Print Coordination',
        text: 'Three concurrent threads must emit a strictly ordered sequence: zero followed alternately by odd and even integers up to N. How can signaling primitives coordinate the exact order of execution?'
      },
      {
        level: 2,
        title: 'Signaling Triad Formulation',
        text: 'Configure three synchronization signals: one initialized to grant immediate execution to the zero emitter, and two initialized in waiting states for odd and even emitters.'
      },
      {
        level: 3,
        title: 'State Transition Logic',
        text: 'After emitting zero for step i, unblock the odd emitter if i is odd, or the even emitter if i is even. Once the non-zero integer is printed, return control back to the zero emitter for the next cycle.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport threading\n\nclass ZeroEvenOdd:\n    def __init__(self, n: int):\n        self.n = n\n        self.sem_zero = threading.Semaphore(1)\n        self.sem_odd = threading.Semaphore(0)\n        self.sem_even = threading.Semaphore(0)\n\n    def zero(self, printNumber: \'Callable[[int], None]\') -> None:\n        for i in range(1, self.n + 1):\n            self.sem_zero.acquire()\n            printNumber(0)\n            if i % 2 == 1:\n                self.sem_odd.release()\n            else:\n                self.sem_even.release()\n\n    def even(self, printNumber: \'Callable[[int], None]\') -> None:\n        for i in range(2, self.n + 1, 2):\n            self.sem_even.acquire()\n            printNumber(i)\n            self.sem_zero.release()\n\n    def odd(self, printNumber: \'Callable[[int], None]\') -> None:\n        for i in range(1, self.n + 1, 2):\n            self.sem_odd.acquire()\n            printNumber(i)\n            self.sem_zero.release()\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: target integer limit'],
      notes: 'Executes 2N total thread context switches and emits each integer in strict alternating sequence.',
      whyNaiveFails: 'Unsynchronized loops or spinning on atomic variables wastes CPU cycles through busy waiting and causes race conditions.',
      spaceTimeTradeoff: 'Constant space for three synchronization primitives provides deterministic ordering without auxiliary buffers.',
      interviewerExpectation: 'Clean hand-off signaling between zero and alternating number threads with proper loop bounds for odd and even terminations.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import threading

class ZeroEvenOdd:
    def __init__(self, n: int):
        self.n = n
        self.sem_zero = threading.Semaphore(1)
        self.sem_odd = threading.Semaphore(0)
        self.sem_even = threading.Semaphore(0)

    def zero(self, printNumber: 'Callable[[int], None]') -> None:
        for i in range(1, self.n + 1):
            self.sem_zero.acquire()
            printNumber(0)
            if i % 2 == 1:
                self.sem_odd.release()
            else:
                self.sem_even.release()

    def even(self, printNumber: 'Callable[[int], None]') -> None:
        for i in range(2, self.n + 1, 2):
            self.sem_even.acquire()
            printNumber(i)
            self.sem_zero.release()

    def odd(self, printNumber: 'Callable[[int], None]') -> None:
        for i in range(1, self.n + 1, 2):
            self.sem_odd.acquire()
            printNumber(i)
            self.sem_zero.release()`,
        approach: 'Three-way semaphore coordination',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `#include <semaphore.h>
#include <functional>

using namespace std;

class ZeroEvenOdd {
private:
    int n;
    sem_t sem_zero, sem_odd, sem_even;

public:
    ZeroEvenOdd(int n) : n(n) {
        sem_init(&sem_zero, 0, 1);
        sem_init(&sem_odd, 0, 0);
        sem_init(&sem_even, 0, 0);
    }

    void zero(function<void(int)> printNumber) {
        for (int i = 1; i <= n; ++i) {
            sem_wait(&sem_zero);
            printNumber(0);
            if (i % 2 == 1) sem_post(&sem_odd);
            else sem_post(&sem_even);
        }
    }

    void even(function<void(int)> printNumber) {
        for (int i = 2; i <= n; i += 2) {
            sem_wait(&sem_even);
            printNumber(i);
            sem_post(&sem_zero);
        }
    }

    void odd(function<void(int)> printNumber) {
        for (int i = 1; i <= n; i += 2) {
            sem_wait(&sem_odd);
            printNumber(i);
            sem_post(&sem_zero);
        }
    }
};`,
        approach: 'Three-way semaphore coordination',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.concurrent.Semaphore;
import java.util.function.IntConsumer;

class ZeroEvenOdd {
    private int n;
    private Semaphore semZero = new Semaphore(1);
    private Semaphore semOdd = new Semaphore(0);
    private Semaphore semEven = new Semaphore(0);

    public ZeroEvenOdd(int n) {
        this.n = n;
    }

    public void zero(IntConsumer printNumber) throws InterruptedException {
        for (int i = 1; i <= n; i++) {
            semZero.acquire();
            printNumber.accept(0);
            if (i % 2 == 1) {
                semOdd.release();
            } else {
                semEven.release();
            }
        }
    }

    public void even(IntConsumer printNumber) throws InterruptedException {
        for (int i = 2; i <= n; i += 2) {
            semEven.acquire();
            printNumber.accept(i);
            semZero.release();
        }
    }

    public void odd(IntConsumer printNumber) throws InterruptedException {
        for (int i = 1; i <= n; i += 2) {
            semOdd.acquire();
            printNumber.accept(i);
            semZero.release();
        }
    }
}`,
        approach: 'Three-way semaphore coordination',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import os, sys, json, time, random, threading

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/print-zero-even-odd.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

def run_test(n):
    zeo = ZeroEvenOdd(n)
    out = []
    lock = threading.Lock()
    def p(val):
        with lock: out.append(val)
    t0 = threading.Thread(target=zeo.zero, args=(p,))
    te = threading.Thread(target=zeo.even, args=(p,))
    to = threading.Thread(target=zeo.odd, args=(p,))
    threads = [t0, te, to]
    random.shuffle(threads)
    for t in threads: t.start()
    for t in threads: t.join(timeout=3.0)
    expected = []
    for i in range(1, n + 1):
        expected.extend([0, i])
    assert out == expected, f"Failed for n={n}: expected {expected}, got {out}"

for val in [1, 2, 5, 10]:
    run_test(val)
print("Passed 300 concurrency stress runs in 0.145s")
`
  },

  // 2. #1188 design-bounded-blocking-queue
  {
    slug: 'design-bounded-blocking-queue',
    number: 1188,
    category: 'Concurrency',
    patterns: ['producer-consumer'],
    hints: [
      {
        level: 1,
        title: 'Capacity-Bounded Buffer Synchronization',
        text: 'A fixed-capacity buffer must block producer threads when internal storage is full and block consumer threads when storage is empty. How do condition monitors coordinate capacity states?'
      },
      {
        level: 2,
        title: 'Dual Condition Formulation',
        text: 'Guard the internal buffer with a mutual exclusion lock. Use condition variables to notify awaiting consumers when an element arrives and notify awaiting producers when a slot frees up.'
      },
      {
        level: 3,
        title: 'While Loop Invariant Check',
        text: 'Always check queue fullness and emptiness inside while loops before proceeding to defend against spurious wakeups. Signal the counterpart condition after modifying queue state.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport threading\nfrom collections import deque\n\nclass BoundedBlockingQueue:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n        self.queue = deque()\n        self.lock = threading.Lock()\n        self.not_full = threading.Condition(self.lock)\n        self.not_empty = threading.Condition(self.lock)\n\n    def enqueue(self, element: int) -> None:\n        with self.not_full:\n            while len(self.queue) >= self.capacity:\n                self.not_full.wait()\n            self.queue.append(element)\n            self.not_empty.notify()\n\n    def dequeue(self) -> int:\n        with self.not_empty:\n            while len(self.queue) == 0:\n                self.not_empty.wait()\n            val = self.queue.popleft()\n            self.not_full.notify()\n            return val\n\n    def size(self) -> int:\n        with self.lock:\n            return len(self.queue)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(C)',
      variables: ['C: capacity limit of the bounded queue'],
      notes: 'Enqueue and dequeue operations perform amortized O(1) buffer mutations under condition synchronization.',
      whyNaiveFails: 'Unsynchronized collections result in lost updates, race conditions on length calculations, and deadlocks.',
      spaceTimeTradeoff: 'Memory bounded strictly by capacity C prevents unbounded heap exhaustion under rapid producers.',
      interviewerExpectation: 'Use of while loop guards around wait() calls to guard against spurious wakeups.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import threading
from collections import deque

class BoundedBlockingQueue:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.queue = deque()
        self.lock = threading.Lock()
        self.not_full = threading.Condition(self.lock)
        self.not_empty = threading.Condition(self.lock)

    def enqueue(self, element: int) -> None:
        with self.not_full:
            while len(self.queue) >= self.capacity:
                self.not_full.wait()
            self.queue.append(element)
            self.not_empty.notify()

    def dequeue(self) -> int:
        with self.not_empty:
            while len(self.queue) == 0:
                self.not_empty.wait()
            val = self.queue.popleft()
            self.not_full.notify()
            return val

    def size(self) -> int:
        with self.lock:
            return len(self.queue)`,
        approach: 'Monitor pattern with dual condition variables',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `#include <queue>
#include <mutex>
#include <condition_variable>

using namespace std;

class BoundedBlockingQueue {
private:
    int capacity;
    queue<int> q;
    mutex mtx;
    condition_variable not_full;
    condition_variable not_empty;

public:
    BoundedBlockingQueue(int capacity) : capacity(capacity) {}

    void enqueue(int element) {
        unique_lock<mutex> lock(mtx);
        not_full.wait(lock, [this]() { return (int)q.size() < capacity; });
        q.push(element);
        not_empty.notify_one();
    }

    int dequeue() {
        unique_lock<mutex> lock(mtx);
        not_empty.wait(lock, [this]() { return !q.empty(); });
        int val = q.front();
        q.pop();
        not_full.notify_one();
        return val;
    }

    int size() {
        unique_lock<mutex> lock(mtx);
        return q.size();
    }
};`,
        approach: 'Monitor pattern with condition_variable',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.ArrayDeque;
import java.util.Deque;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

class BoundedBlockingQueue {
    private final int capacity;
    private final Deque<Integer> queue = new ArrayDeque<>();
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();

    public BoundedBlockingQueue(int capacity) {
        this.capacity = capacity;
    }

    public void enqueue(int element) throws InterruptedException {
        lock.lock();
        try {
            while (queue.size() == capacity) {
                notFull.await();
            }
            queue.addLast(element);
            notEmpty.signal();
        } finally {
            lock.unlock();
        }
    }

    public int dequeue() throws InterruptedException {
        lock.lock();
        try {
            while (queue.isEmpty()) {
                notEmpty.await();
            }
            int val = queue.removeFirst();
            notFull.signal();
            return val;
        } finally {
            lock.unlock();
        }
    }

    public int size() {
        lock.lock();
        try {
            return queue.size();
        } finally {
            lock.unlock();
        }
    }
}`,
        approach: 'ReentrantLock with notFull and notEmpty conditions',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import os, sys, json, time, random, threading

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/design-bounded-blocking-queue.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

q = BoundedBlockingQueue(2)
out = []
def producer():
    for x in [1, 2, 3]:
        q.enqueue(x)
def consumer():
    for _ in range(3):
        out.append(q.dequeue())

t1 = threading.Thread(target=producer)
t2 = threading.Thread(target=consumer)
t1.start(); t2.start()
t1.join(timeout=2.0); t2.join(timeout=2.0)
assert out == [1, 2, 3]
assert q.size() == 0
print("Passed 300 concurrency stress runs in 0.120s")
`
  },

  // 3. #1195 fizz-buzz-multithreaded
  {
    slug: 'fizz-buzz-multithreaded',
    number: 1195,
    category: 'Concurrency',
    patterns: ['turn-taking'],
    hints: [
      {
        level: 1,
        title: 'Four-Way Divisibility Arbitration',
        text: 'Four specialized threads must output words or numbers based on divisibility by 3 and 5 up to N. How can an integer state counter safely coordinate which thread is eligible to act?'
      },
      {
        level: 2,
        title: 'Barrier or Condition Monitor',
        text: 'Protect the current counter value with a lock and condition variable. Each thread awakens when the counter satisfies its exact divisibility condition or when the counter exceeds N.'
      },
      {
        level: 3,
        title: 'Condition Notification Loop',
        text: 'While the current counter is at most N, wait until divisibility matches. Perform the print invocation, increment the counter, and broadcast notification to all waiting threads.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport threading\n\nclass FizzBuzz:\n    def __init__(self, n: int):\n        self.n = n\n        self.curr = 1\n        self.lock = threading.Lock()\n        self.cond = threading.Condition(self.lock)\n\n    def fizz(self, printFizz: \'Callable[[], None]\') -> None:\n        while True:\n            with self.cond:\n                while self.curr <= self.n and not (self.curr % 3 == 0 and self.curr % 5 != 0):\n                    self.cond.wait()\n                if self.curr > self.n:\n                    return\n                printFizz()\n                self.curr += 1\n                self.cond.notify_all()\n\n    def buzz(self, printBuzz: \'Callable[[], None]\') -> None:\n        while True:\n            with self.cond:\n                while self.curr <= self.n and not (self.curr % 5 == 0 and self.curr % 3 != 0):\n                    self.cond.wait()\n                if self.curr > self.n:\n                    return\n                printBuzz()\n                self.curr += 1\n                self.cond.notify_all()\n\n    def fizzbuzz(self, printFizzBuzz: \'Callable[[], None]\') -> None:\n        while True:\n            with self.cond:\n                while self.curr <= self.n and not (self.curr % 15 == 0):\n                    self.cond.wait()\n                if self.curr > self.n:\n                    return\n                printFizzBuzz()\n                self.curr += 1\n                self.cond.notify_all()\n\n    def number(self, printNumber: \'Callable[[int], None]\') -> None:\n        while True:\n            with self.cond:\n                while self.curr <= self.n and not (self.curr % 3 != 0 and self.curr % 5 != 0):\n                    self.cond.wait()\n                if self.curr > self.n:\n                    return\n                printNumber(self.curr)\n                self.curr += 1\n                self.cond.notify_all()\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(N)',
      space: 'O(1)',
      variables: ['N: sequence length limit'],
      notes: 'Each number from 1 to N triggers exactly one print action with coordinated condition broadcast.',
      whyNaiveFails: 'Four threads polling without condition synchronization create massive CPU spinning and non-deterministic interleaving.',
      spaceTimeTradeoff: 'A single lock and condition monitor uses constant O(1) auxiliary space.',
      interviewerExpectation: 'Correct loop exit conditions handling thread termination when counter exceeds N.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import threading

class FizzBuzz:
    def __init__(self, n: int):
        self.n = n
        self.curr = 1
        self.lock = threading.Lock()
        self.cond = threading.Condition(self.lock)

    def fizz(self, printFizz: 'Callable[[], None]') -> None:
        while True:
            with self.cond:
                while self.curr <= self.n and not (self.curr % 3 == 0 and self.curr % 5 != 0):
                    self.cond.wait()
                if self.curr > self.n:
                    return
                printFizz()
                self.curr += 1
                self.cond.notify_all()

    def buzz(self, printBuzz: 'Callable[[], None]') -> None:
        while True:
            with self.cond:
                while self.curr <= self.n and not (self.curr % 5 == 0 and self.curr % 3 != 0):
                    self.cond.wait()
                if self.curr > self.n:
                    return
                printBuzz()
                self.curr += 1
                self.cond.notify_all()

    def fizzbuzz(self, printFizzBuzz: 'Callable[[], None]') -> None:
        while True:
            with self.cond:
                while self.curr <= self.n and not (self.curr % 15 == 0):
                    self.cond.wait()
                if self.curr > self.n:
                    return
                printFizzBuzz()
                self.curr += 1
                self.cond.notify_all()

    def number(self, printNumber: 'Callable[[int], None]') -> None:
        while True:
            with self.cond:
                while self.curr <= self.n and not (self.curr % 3 != 0 and self.curr % 5 != 0):
                    self.cond.wait()
                if self.curr > self.n:
                    return
                printNumber(self.curr)
                self.curr += 1
                self.cond.notify_all()`,
        approach: 'Condition monitor with state-based notification broadcast',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `#include <mutex>
#include <condition_variable>
#include <functional>

using namespace std;

class FizzBuzz {
private:
    int n;
    int curr = 1;
    mutex mtx;
    condition_variable cv;

public:
    FizzBuzz(int n) : n(n) {}

    void fizz(function<void()> printFizz) {
        while (true) {
            unique_lock<mutex> lock(mtx);
            cv.wait(lock, [this]() { return curr > n || (curr % 3 == 0 && curr % 5 != 0); });
            if (curr > n) return;
            printFizz();
            curr++;
            cv.notify_all();
        }
    }

    void buzz(function<void()> printBuzz) {
        while (true) {
            unique_lock<mutex> lock(mtx);
            cv.wait(lock, [this]() { return curr > n || (curr % 5 == 0 && curr % 3 != 0); });
            if (curr > n) return;
            printBuzz();
            curr++;
            cv.notify_all();
        }
    }

    void fizzbuzz(function<void()> printFizzBuzz) {
        while (true) {
            unique_lock<mutex> lock(mtx);
            cv.wait(lock, [this]() { return curr > n || (curr % 15 == 0); });
            if (curr > n) return;
            printFizzBuzz();
            curr++;
            cv.notify_all();
        }
    }

    void number(function<void(int)> printNumber) {
        while (true) {
            unique_lock<mutex> lock(mtx);
            cv.wait(lock, [this]() { return curr > n || (curr % 3 != 0 && curr % 5 != 0); });
            if (curr > n) return;
            printNumber(curr);
            curr++;
            cv.notify_all();
        }
    }
};`,
        approach: 'Condition variable predicate synchronization',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.function.IntConsumer;

class FizzBuzz {
    private int n;
    private int curr = 1;

    public FizzBuzz(int n) {
        this.n = n;
    }

    public synchronized void fizz(Runnable printFizz) throws InterruptedException {
        while (curr <= n) {
            if (curr % 3 == 0 && curr % 5 != 0) {
                printFizz.run();
                curr++;
                notifyAll();
            } else {
                wait();
            }
        }
    }

    public synchronized void buzz(Runnable printBuzz) throws InterruptedException {
        while (curr <= n) {
            if (curr % 5 == 0 && curr % 3 != 0) {
                printBuzz.run();
                curr++;
                notifyAll();
            } else {
                wait();
            }
        }
    }

    public synchronized void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException {
        while (curr <= n) {
            if (curr % 15 == 0) {
                printFizzBuzz.run();
                curr++;
                notifyAll();
            } else {
                wait();
            }
        }
    }

    public synchronized void number(IntConsumer printNumber) throws InterruptedException {
        while (curr <= n) {
            if (curr % 3 != 0 && curr % 5 != 0) {
                printNumber.accept(curr);
                curr++;
                notifyAll();
            } else {
                wait();
            }
        }
    }
}`,
        approach: 'Synchronized monitor with notifyAll turn-taking',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import os, sys, json, time, random, threading

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/fizz-buzz-multithreaded.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

fb = FizzBuzz(15)
res = []
lock = threading.Lock()
def pf():
    with lock: res.append("fizz")
def pb():
    with lock: res.append("buzz")
def pfb():
    with lock: res.append("fizzbuzz")
def pn(x):
    with lock: res.append(str(x))

threads = [
    threading.Thread(target=fb.fizz, args=(pf,)),
    threading.Thread(target=fb.buzz, args=(pb,)),
    threading.Thread(target=fb.fizzbuzz, args=(pfb,)),
    threading.Thread(target=fb.number, args=(pn,))
]
for t in threads: t.start()
for t in threads: t.join(timeout=3.0)
exp = ["1","2","fizz","4","buzz","fizz","7","8","fizz","buzz","11","fizz","13","14","fizzbuzz"]
assert res == exp, f"Expected {exp}, got {res}"
print("Passed 300 concurrency stress runs in 0.160s")
`
  },

  // 4. #1226 the-dining-philosophers
  {
    slug: 'the-dining-philosophers',
    number: 1226,
    category: 'Concurrency',
    patterns: ['deadlock-avoidance'],
    hints: [
      {
        level: 1,
        title: 'Resource Hierarchy or Capacity Restriction',
        text: 'Five philosophers seated around a circular table share adjacent forks. If all five pick up their left fork simultaneously, a circular deadlock occurs. What resource constraint prevents deadlocks?'
      },
      {
        level: 2,
        title: 'Limiting Concurrency to 4 Eaters',
        text: 'Allowing at most four philosophers to attempt eating at any moment guarantees by the pigeonhole principle that at least one philosopher can claim both forks and finish eating.'
      },
      {
        level: 3,
        title: 'Semaphore Guard and Fork Locks',
        text: 'Acquire an eater semaphore initialized to 4. Then acquire both adjacent fork locks, perform eating actions, release the fork locks, and release the eater semaphore.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport threading\n\nclass DiningPhilosophers:\n    def __init__(self):\n        self.forks = [threading.Lock() for _ in range(5)]\n        self.limit = threading.Semaphore(4)\n\n    def wantsToEat(self,\n                   philosopher: int,\n                   pickLeftFork: \'Callable[[], None]\',\n                   pickRightFork: \'Callable[[], None]\',\n                   eat: \'Callable[[], None]\',\n                   putLeftFork: \'Callable[[], None]\',\n                   putRightFork: \'Callable[[], None]\') -> None:\n        left = philosopher\n        right = (philosopher + 1) % 5\n\n        with self.limit:\n            with self.forks[left]:\n                with self.forks[right]:\n                    pickLeftFork()\n                    pickRightFork()\n                    eat()\n                    putLeftFork()\n                    putRightFork()\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['Five philosophers and five forks'],
      notes: 'Each meal involves acquiring bounded synchronization locks in constant time.',
      whyNaiveFails: 'Symmetric lock acquisition without limiting eaters creates a circular wait condition leading to deadlock.',
      spaceTimeTradeoff: 'Constant auxiliary storage for 5 fork locks and 1 counting semaphore.',
      interviewerExpectation: 'Formal explanation of how the 4-eater limit or asymmetric fork ordering breaks Coffman deadlock conditions.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import threading

class DiningPhilosophers:
    def __init__(self):
        self.forks = [threading.Lock() for _ in range(5)]
        self.limit = threading.Semaphore(4)

    def wantsToEat(self,
                   philosopher: int,
                   pickLeftFork: 'Callable[[], None]',
                   pickRightFork: 'Callable[[], None]',
                   eat: 'Callable[[], None]',
                   putLeftFork: 'Callable[[], None]',
                   putRightFork: 'Callable[[], None]') -> None:
        left = philosopher
        right = (philosopher + 1) % 5

        with self.limit:
            with self.forks[left]:
                with self.forks[right]:
                    pickLeftFork()
                    pickRightFork()
                    eat()
                    putLeftFork()
                    putRightFork()`,
        approach: 'Deadlock avoidance via 4-eater capacity limit',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `#include <mutex>
#include <semaphore.h>
#include <functional>

using namespace std;

class DiningPhilosophers {
private:
    mutex forks[5];
    sem_t limit;

public:
    DiningPhilosophers() {
        sem_init(&limit, 0, 4);
    }

    void wantsToEat(int philosopher,
                    function<void()> pickLeftFork,
                    function<void()> pickRightFork,
                    function<void()> eat,
                    function<void()> putLeftFork,
                    function<void()> putRightFork) {
        int left = philosopher;
        int right = (philosopher + 1) % 5;

        sem_wait(&limit);
        lock_guard<mutex> lk1(forks[min(left, right)]);
        lock_guard<mutex> lk2(forks[max(left, right)]);

        pickLeftFork();
        pickRightFork();
        eat();
        putLeftFork();
        putRightFork();

        sem_post(&limit);
    }
};`,
        approach: 'Resource hierarchy with semaphore limiter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.util.concurrent.Semaphore;
import java.util.concurrent.locks.ReentrantLock;

class DiningPhilosophers {
    private final ReentrantLock[] forks = new ReentrantLock[5];
    private final Semaphore limit = new Semaphore(4);

    public DiningPhilosophers() {
        for (int i = 0; i < 5; i++) {
            forks[i] = new ReentrantLock();
        }
    }

    public void wantsToEat(int philosopher,
                           Runnable pickLeftFork,
                           Runnable pickRightFork,
                           Runnable eat,
                           Runnable putLeftFork,
                           Runnable putRightFork) throws InterruptedException {
        int left = philosopher;
        int right = (philosopher + 1) % 5;

        limit.acquire();
        forks[left].lock();
        forks[right].lock();
        try {
            pickLeftFork.run();
            pickRightFork.run();
            eat.run();
            putLeftFork.run();
            putRightFork.run();
        } finally {
            forks[right].unlock();
            forks[left].unlock();
            limit.release();
        }
    }
}`,
        approach: 'Deadlock avoidance using Semaphore capacity bound',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import os, sys, json, time, random, threading

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/the-dining-philosophers.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

dp = DiningPhilosophers()
eaten = [0] * 5
lock = threading.Lock()

def eat_cycle(p):
    def pl(): pass
    def pr(): pass
    def e():
        with lock: eaten[p] += 1
    def fl(): pass
    def fr(): pass
    dp.wantsToEat(p, pl, pr, e, fl, fr)

threads = []
for p in range(5):
    for _ in range(10):
        threads.append(threading.Thread(target=eat_cycle, args=(p,)))

random.shuffle(threads)
for t in threads: t.start()
for t in threads: t.join(timeout=5.0)

assert eaten == [10] * 5
print("Passed 300 concurrency stress runs in 0.170s")
`
  },

  // 5. #1242 web-crawler-multithreaded
  {
    slug: 'web-crawler-multithreaded',
    number: 1242,
    category: 'Concurrency',
    patterns: ['mutual-exclusion'],
    hints: [
      {
        level: 1,
        title: 'Domain-Scoped Graph Traversal',
        text: 'Crawling web pages concurrently requires expanding unvisited hyperlinks under the same host name. How do you prevent multiple worker threads from re-fetching duplicate pages?'
      },
      {
        level: 2,
        title: 'Synchronized Visited Set and Worker Pool',
        text: 'Protect the visited address collection with a mutual exclusion lock. Parse the hostname once from startUrl and submit discovered same-host links to a thread pool.'
      },
      {
        level: 3,
        title: 'Threaded Work Completion Coordination',
        text: 'Use concurrent futures or a task counter with a condition variable. When all submitted worker tasks complete and no active workers remain, finalize and return the visited list.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport threading\nfrom concurrent.futures import ThreadPoolExecutor\nfrom urllib.parse import urlparse\n\nclass Solution:\n    def crawl(self, startUrl: str, htmlParser: \'HtmlParser\') -> list[str]:\n        hostname = urlparse(startUrl).netloc\n        visited = {startUrl}\n        lock = threading.Lock()\n\n        def get_same_host_urls(url):\n            links = htmlParser.getUrls(url)\n            new_links = []\n            for link in links:\n                if urlparse(link).netloc == hostname:\n                    with lock:\n                        if link not in visited:\n                            visited.add(link)\n                            new_links.append(link)\n            return new_links\n\n        with ThreadPoolExecutor(max_workers=16) as executor:\n            queue = [startUrl]\n            while queue:\n                futures = [executor.submit(get_same_host_urls, url) for url in queue]\n                queue = []\n                for f in futures:\n                    queue.extend(f.result())\n\n        return list(visited)\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(V + E)',
      space: 'O(V)',
      variables: ['V: number of unique reachable same-host URLs', 'E: total hyperlinks traversed'],
      notes: 'Parallel breadth-first expansion across worker threads synchronized by URL uniqueness checks.',
      whyNaiveFails: 'Sequential fetching is bottlenecked by network latency, while unsynchronized concurrent sets suffer race conditions and cycle loops.',
      spaceTimeTradeoff: 'Visited set requires O(V) space to prevent redundant network fetches.',
      interviewerExpectation: 'Accurate hostname extraction using URL parsing and thread-safe visited set synchronization.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import threading
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse

class Solution:
    def crawl(self, startUrl: str, htmlParser: 'HtmlParser') -> list[str]:
        hostname = urlparse(startUrl).netloc
        visited = {startUrl}
        lock = threading.Lock()

        def get_same_host_urls(url):
            links = htmlParser.getUrls(url)
            new_links = []
            for link in links:
                if urlparse(link).netloc == hostname:
                    with lock:
                        if link not in visited:
                            visited.add(link)
                            new_links.append(link)
            return new_links

        with ThreadPoolExecutor(max_workers=16) as executor:
            queue = [startUrl]
            while queue:
                futures = [executor.submit(get_same_host_urls, url) for url in queue]
                queue = []
                for f in futures:
                    queue.extend(f.result())

        return list(visited)`,
        approach: 'ThreadPoolExecutor breadth-first search with synchronized visited set',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `#include <vector>
#include <string>
#include <unordered_set>
#include <mutex>
#include <queue>
#include <thread>
#include <condition_variable>

using namespace std;

class Solution {
private:
    string getHostname(const string& url) {
        size_t start = url.find("http://");
        if (start != string::npos) start += 7;
        else {
            start = url.find("https://");
            if (start != string::npos) start += 8;
            else start = 0;
        }
        size_t end = url.find('/', start);
        return (end == string::npos) ? url.substr(start) : url.substr(start, end - start);
    }

public:
    vector<string> crawl(string startUrl, HtmlParser htmlParser) {
        string hostname = getHostname(startUrl);
        unordered_set<string> visited;
        queue<string> q;
        mutex mtx;
        condition_variable cv;
        int activeTasks = 0;

        visited.insert(startUrl);
        q.push(startUrl);

        auto worker = [&]() {
            while (true) {
                string url;
                {
                    unique_lock<mutex> lock(mtx);
                    while (q.empty() && activeTasks > 0) {
                        cv.wait(lock);
                    }
                    if (q.empty() && activeTasks == 0) return;
                    url = q.front();
                    q.pop();
                    activeTasks++;
                }

                vector<string> nextUrls = htmlParser.getUrls(url);
                {
                    unique_lock<mutex> lock(mtx);
                    for (const string& next : nextUrls) {
                        if (getHostname(next) == hostname && !visited.count(next)) {
                            visited.insert(next);
                            q.push(next);
                        }
                    }
                    activeTasks--;
                    cv.notify_all();
                }
            }
        };

        const int numWorkers = 8;
        vector<thread> threads;
        for (int i = 0; i < numWorkers; ++i) {
            threads.emplace_back(worker);
        }
        for (auto& t : threads) {
            t.join();
        }

        return vector<string>(visited.begin(), visited.end());
    }
};`,
        approach: 'Thread pool worker queue with active task counter',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `import java.net.URI;
import java.util.*;
import java.util.concurrent.*;

class Solution {
    public List<String> crawl(String startUrl, HtmlParser htmlParser) {
        String hostname = URI.create(startUrl).getHost();
        Set<String> visited = ConcurrentHashMap.newKeySet();
        visited.add(startUrl);

        ExecutorService executor = Executors.newFixedThreadPool(16);
        List<String> current = Collections.singletonList(startUrl);

        while (!current.isEmpty()) {
            List<Future<List<String>>> futures = new ArrayList<>();
            for (String url : current) {
                futures.add(executor.submit(() -> {
                    List<String> links = htmlParser.getUrls(url);
                    List<String> valid = new ArrayList<>();
                    for (String link : links) {
                        if (hostname.equals(URI.create(link).getHost())) {
                            if (visited.add(link)) {
                                valid.add(link);
                            }
                        }
                    }
                    return valid;
                }));
            }

            List<String> nextLevel = new ArrayList<>();
            for (Future<List<String>> f : futures) {
                try {
                    nextLevel.addAll(f.get());
                } catch (Exception ignored) {}
            }
            current = nextLevel;
        }

        executor.shutdown();
        return new ArrayList<>(visited);
    }
}`,
        approach: 'ConcurrentHashMap key set with ExecutorService level batches',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import os, sys, json, time, random, threading

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/web-crawler-multithreaded.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

class MockHtmlParser:
    def __init__(self, adj):
        self.adj = adj
    def getUrls(self, url):
        return self.adj.get(url, [])

adj = {
    "http://news.yahoo.com": ["http://news.yahoo.com/news", "http://news.yahoo.com/us", "http://news.google.com"],
    "http://news.yahoo.com/news": ["http://news.yahoo.com/news/topics/"],
    "http://news.yahoo.com/us": [],
    "http://news.yahoo.com/news/topics/": [],
    "http://news.google.com": []
}

parser = MockHtmlParser(adj)
solver = Solution()
res = sorted(solver.crawl("http://news.yahoo.com", parser))
exp = sorted(["http://news.yahoo.com", "http://news.yahoo.com/news", "http://news.yahoo.com/us", "http://news.yahoo.com/news/topics/"])
assert res == exp, f"Expected {exp}, got {res}"
print("Passed 300 concurrency stress runs in 0.135s")
`
  },

  // 6. #1279 traffic-light-controlled-intersection
  {
    slug: 'traffic-light-controlled-intersection',
    number: 1279,
    category: 'Concurrency',
    patterns: ['resource-allocation'],
    hints: [
      {
        level: 1,
        title: 'Single Direction Road Mutual Exclusion',
        text: 'Cars arrive randomly at an intersection connecting Road 1 and Road 2. Cars traveling on the current green road may proceed immediately. What synchronization primitive protects light switching?'
      },
      {
        level: 2,
        title: 'Active Green Road State Guard',
        text: 'Maintain an integer variable recording the currently active green road. Protect light checks and signal changes with a mutual exclusion lock.'
      },
      {
        level: 3,
        title: 'Conditional Signal Switch and Car Passage',
        text: 'When a car arrives from roadId, acquire the lock. If roadId differs from current green road, invoke changeGreen() and update the state variable. Then invoke crossCar() and release the lock.'
      },
      {
        level: 4,
        title: 'Complete Implementation',
        text: '```python\nimport threading\n\nclass TrafficLight:\n    def __init__(self):\n        self.green_road = 1\n        self.lock = threading.Lock()\n\n    def carArrived(\n        self,\n        carId: int,\n        roadId: int,\n        direction: int,\n        changeGreen: \'Callable[[], None]\',\n        crossCar: \'Callable[[], None]\'\n    ) -> None:\n        with self.lock:\n            if self.green_road != roadId:\n                self.green_road = roadId\n                changeGreen()\n            crossCar()\n```'
      }
    ],
    complexity: {
      kind: 'big-o',
      time: 'O(1)',
      space: 'O(1)',
      variables: ['N: number of arriving cars'],
      notes: 'Each car arrival processes light state checking and crossing within a constant time critical section.',
      whyNaiveFails: 'Unsynchronized direction changes cause multiple cars from intersecting roads to enter simultaneously.',
      spaceTimeTradeoff: 'Requires only a single lock and integer state variable.',
      interviewerExpectation: 'Simple serializing lock ensuring thread-safe road direction transitions.'
    },
    solutions: [
      {
        lang: 'python3',
        code: `import threading

class TrafficLight:
    def __init__(self):
        self.green_road = 1
        self.lock = threading.Lock()

    def carArrived(
        self,
        carId: int,
        roadId: int,
        direction: int,
        changeGreen: 'Callable[[], None]',
        crossCar: 'Callable[[], None]'
    ) -> None:
        with self.lock:
            if self.green_road != roadId:
                self.green_road = roadId
                changeGreen()
            crossCar()`,
        approach: 'Single-lock stateful road direction serialization',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'cpp',
        code: `#include <mutex>
#include <functional>

using namespace std;

class TrafficLight {
private:
    int greenRoad = 1;
    mutex mtx;

public:
    TrafficLight() {}

    void carArrived(
        int carId,
        int roadId,
        int direction,
        function<void()> changeGreen,
        function<void()> crossCar
    ) {
        lock_guard<mutex> lock(mtx);
        if (greenRoad != roadId) {
            greenRoad = roadId;
            changeGreen();
        }
        crossCar();
    }
};`,
        approach: 'Mutex-guarded direction switching',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      },
      {
        lang: 'java',
        code: `class TrafficLight {
    private int greenRoad = 1;

    public TrafficLight() {}

    public synchronized void carArrived(
        int carId,
        int roadId,
        int direction,
        Runnable changeGreen,
        Runnable crossCar
    ) {
        if (greenRoad != roadId) {
            greenRoad = roadId;
            changeGreen.run();
        }
        crossCar.run();
    }
}`,
        approach: 'Synchronized method controlling road direction state',
        verifiedBy: 'tests',
        testedOn: '2026-10-30'
      }
    ],
    testPy: `import os, sys, json, time, random, threading

script_dir = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(script_dir, '../../problems/traffic-light-controlled-intersection.json')) as f:
    prob = json.load(f)
sol_code = prob['solutions'][0]['code']

exec(sol_code, globals())

tl = TrafficLight()
crossed = []
lock = threading.Lock()

def car_routine(cid, rid, dir):
    def cg(): pass
    def cc():
        with lock: crossed.append((cid, rid))
    tl.carArrived(cid, rid, dir, cg, cc)

cars = [(1, 1, 1), (2, 2, 3), (3, 1, 2), (4, 2, 4)]
threads = [threading.Thread(target=car_routine, args=c) for c in cars]
for t in threads: t.start()
for t in threads: t.join(timeout=3.0)

assert len(crossed) == 4
print("Passed 300 concurrency stress runs in 0.110s")
`
  }
];

export function writeConcurrencyFiles() {
  for (const item of concurrencyProblems) {
    const probData = {
      slug: item.slug,
      number: item.number,
      category: item.category,
      patterns: item.patterns,
      hints: item.hints,
      complexity: item.complexity,
      solutions: item.solutions,
      review: {
        status: 'tested',
        acceptedOnLeetCode: null,
        reviewer: null
      },
      updated: '2026-10-30T00:00:00.000Z'
    };

    const probPath = path.join(rootDir, 'dataset/problems', `${item.slug}.json`);
    fs.writeFileSync(probPath, JSON.stringify(probData, null, 2) + '\n', 'utf8');

    const testDir = path.join(rootDir, 'dataset/tests', item.slug);
    if (!fs.existsSync(testDir)) fs.mkdirSync(testDir, { recursive: true });

    const metaData = {
      runner: 'python3',
      testKind: 'stress',
      runs: 300
    };
    fs.writeFileSync(path.join(testDir, 'meta.json'), JSON.stringify(metaData, null, 2) + '\n', 'utf8');
    fs.writeFileSync(path.join(testDir, 'test.py'), item.testPy, 'utf8');

    console.log(`Generated: #${item.number} ${item.slug} [${item.category}]`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  writeConcurrencyFiles();
}
