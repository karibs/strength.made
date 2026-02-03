// SPA 환경에서 중복 선언 방지
if (typeof window.selectedProgram === 'undefined') {
    window.selectedProgram = null;
}
if (typeof window.currentRoutine === 'undefined') {
    window.currentRoutine = null;
}

        function initToolPage() {
            const cards = document.querySelectorAll('.program-card');
            if (!cards.length) return;

            window.selectedProgram = null;
            window.currentRoutine = null;

            cards.forEach(card => {
                card.addEventListener('click', function() {
                    document.querySelectorAll('.program-card').forEach(c => c.classList.remove('selected'));
                    this.classList.add('selected');
                    window.selectedProgram = this.dataset.program;
                });
            });
        }

        document.addEventListener('DOMContentLoaded', initToolPage);
        window.initToolPage = initToolPage;

        function generateRoutine() {
            if (!window.selectedProgram) {
                alert('프로그램을 먼저 선택해주세요.');
                return;
            }

            const squat = parseFloat(document.getElementById('squat1rm').value);
            const bench = parseFloat(document.getElementById('bench1rm').value);
            const deadlift = parseFloat(document.getElementById('deadlift1rm').value);
            const press = parseFloat(document.getElementById('press1rm').value);

            if (!squat || !bench || !deadlift || !press) {
                alert('모든 1RM 값을 입력해주세요.');
                return;
            }

            const experience = document.getElementById('experience').value;
            const trainingDays = parseInt(document.getElementById('trainingDays').value);

            let routine;
            switch(window.selectedProgram) {
                case 'starting-strength':
                    routine = generateStartingStrength(squat, bench, deadlift, press);
                    break;
                case '531':
                    routine = generate531(squat, bench, deadlift, press);
                    break;
                case 'texas-method':
                    routine = generateTexasMethod(squat, bench, deadlift, press);
                    break;
                case 'gzcl':
                    routine = generateGZCL(squat, bench, deadlift, press, trainingDays);
                    break;
                case 'nsuns':
                    routine = generateNSuns(squat, bench, deadlift, press, trainingDays);
                    break;
            }

            displayRoutine(routine);
        }

        function generateStartingStrength(squat, bench, deadlift, press) {
            const tm = {
                squat: squat * 0.9,
                bench: bench * 0.9,
                deadlift: deadlift * 0.9,
                press: press * 0.9
            };

            return {
                program: 'Starting Strength',
                description: '선형 진행 프로그램 - 매 세션 2.5-5kg 증가',
                weeks: [
                    {
                        name: '1주차',
                        days: [
                            {
                                name: 'Day A (월요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '3x5', weight: Math.round(tm.squat), rest: '3-5분' },
                                    { name: '벤치프레스', sets: '3x5', weight: Math.round(tm.bench), rest: '3-5분' },
                                    { name: '데드리프트', sets: '1x5', weight: Math.round(tm.deadlift), rest: '3-5분' }
                                ]
                            },
                            {
                                name: 'Day B (수요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '3x5', weight: Math.round(tm.squat + 5), rest: '3-5분' },
                                    { name: '오버헤드프레스', sets: '3x5', weight: Math.round(tm.press), rest: '3-5분' },
                                    { name: '파워클린', sets: '5x3', weight: Math.round(tm.deadlift * 0.6), rest: '2-3분' }
                                ]
                            },
                            {
                                name: 'Day A (금요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '3x5', weight: Math.round(tm.squat + 10), rest: '3-5분' },
                                    { name: '벤치프레스', sets: '3x5', weight: Math.round(tm.bench + 2.5), rest: '3-5분' },
                                    { name: '데드리프트', sets: '1x5', weight: Math.round(tm.deadlift + 5), rest: '3-5분' }
                                ]
                            }
                        ]
                    },
                    {
                        name: '2주차',
                        days: [
                            {
                                name: 'Day B (월요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '3x5', weight: Math.round(tm.squat + 15), rest: '3-5분' },
                                    { name: '오버헤드프레스', sets: '3x5', weight: Math.round(tm.press + 2.5), rest: '3-5분' },
                                    { name: '파워클린', sets: '5x3', weight: Math.round(tm.deadlift * 0.6 + 2.5), rest: '2-3분' }
                                ]
                            },
                            {
                                name: 'Day A (수요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '3x5', weight: Math.round(tm.squat + 20), rest: '3-5분' },
                                    { name: '벤치프레스', sets: '3x5', weight: Math.round(tm.bench + 5), rest: '3-5분' },
                                    { name: '데드리프트', sets: '1x5', weight: Math.round(tm.deadlift + 10), rest: '3-5분' }
                                ]
                            },
                            {
                                name: 'Day B (금요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '3x5', weight: Math.round(tm.squat + 25), rest: '3-5분' },
                                    { name: '오버헤드프레스', sets: '3x5', weight: Math.round(tm.press + 5), rest: '3-5분' },
                                    { name: '파워클린', sets: '5x3', weight: Math.round(tm.deadlift * 0.6 + 5), rest: '2-3분' }
                                ]
                            }
                        ]
                    },
                    {
                        name: '3주차',
                        days: [
                            {
                                name: 'Day A (월요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '3x5', weight: Math.round(tm.squat + 30), rest: '3-5분' },
                                    { name: '벤치프레스', sets: '3x5', weight: Math.round(tm.bench + 7.5), rest: '3-5분' },
                                    { name: '데드리프트', sets: '1x5', weight: Math.round(tm.deadlift + 15), rest: '3-5분' }
                                ]
                            },
                            {
                                name: 'Day B (수요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '3x5', weight: Math.round(tm.squat + 35), rest: '3-5분' },
                                    { name: '오버헤드프레스', sets: '3x5', weight: Math.round(tm.press + 7.5), rest: '3-5분' },
                                    { name: '파워클린', sets: '5x3', weight: Math.round(tm.deadlift * 0.6 + 7.5), rest: '2-3분' }
                                ]
                            },
                            {
                                name: 'Day A (금요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '3x5', weight: Math.round(tm.squat + 40), rest: '3-5분' },
                                    { name: '벤치프레스', sets: '3x5', weight: Math.round(tm.bench + 10), rest: '3-5분' },
                                    { name: '데드리프트', sets: '1x5', weight: Math.round(tm.deadlift + 20), rest: '3-5분' }
                                ]
                            }
                        ]
                    },
                    {
                        name: '4주차',
                        days: [
                            {
                                name: 'Day B (월요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '3x5', weight: Math.round(tm.squat + 45), rest: '3-5분' },
                                    { name: '오버헤드프레스', sets: '3x5', weight: Math.round(tm.press + 10), rest: '3-5분' },
                                    { name: '파워클린', sets: '5x3', weight: Math.round(tm.deadlift * 0.6 + 10), rest: '2-3분' }
                                ]
                            },
                            {
                                name: 'Day A (수요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '3x5', weight: Math.round(tm.squat + 50), rest: '3-5분' },
                                    { name: '벤치프레스', sets: '3x5', weight: Math.round(tm.bench + 12.5), rest: '3-5분' },
                                    { name: '데드리프트', sets: '1x5', weight: Math.round(tm.deadlift + 25), rest: '3-5분' }
                                ]
                            },
                            {
                                name: 'Day B (금요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '3x5', weight: Math.round(tm.squat + 55), rest: '3-5분' },
                                    { name: '오버헤드프레스', sets: '3x5', weight: Math.round(tm.press + 12.5), rest: '3-5분' },
                                    { name: '파워클린', sets: '5x3', weight: Math.round(tm.deadlift * 0.6 + 12.5), rest: '2-3분' }
                                ]
                            }
                        ]
                    }
                ],
                notes: [
                    '매 세션마다 중량 증가: 스쿼트/데드리프트 +5kg, 프레스 계열 +2.5kg',
                    '실패 시 10% 감량 후 재시작 (디로드)',
                    '충분한 휴식과 영양 섭취 필수',
                    '폼이 무너지면 중량 증가를 멈추고 폼 교정',
                    '워밍업: 빈 바 → 50% → 70% → 작업 중량'
                ]
            };
        }

        function generate531(squat, bench, deadlift, press) {
            const tm = {
                squat: squat * 0.9,
                bench: bench * 0.9,
                deadlift: deadlift * 0.9,
                press: press * 0.9
            };

            return {
                program: '5/3/1',
                description: '4주 사이클 프로그램 - 매달 점진적 증가',
                weeks: [
                    {
                        name: '1주차 (5/5/5+)',
                        days: [
                            {
                                name: 'Day 1 - 프레스',
                                exercises: [
                                    { name: '오버헤드프레스', sets: '5 @ 65%', weight: Math.round(tm.press * 0.65), rest: '90초' },
                                    { name: '오버헤드프레스', sets: '5 @ 75%', weight: Math.round(tm.press * 0.75), rest: '2분' },
                                    { name: '오버헤드프레스', sets: '5+ @ 85%', weight: Math.round(tm.press * 0.85), rest: '3분' },
                                    { name: '인클라인 벤치프레스 (BBB)', sets: '5x10', weight: Math.round(tm.bench * 0.5), rest: '90초' },
                                    { name: '친업', sets: '5x10', weight: '체중', rest: '90초' }
                                ]
                            },
                            {
                                name: 'Day 2 - 데드리프트',
                                exercises: [
                                    { name: '데드리프트', sets: '5 @ 65%', weight: Math.round(tm.deadlift * 0.65), rest: '90초' },
                                    { name: '데드리프트', sets: '5 @ 75%', weight: Math.round(tm.deadlift * 0.75), rest: '2분' },
                                    { name: '데드리프트', sets: '5+ @ 85%', weight: Math.round(tm.deadlift * 0.85), rest: '3분' },
                                    { name: '스쿼트 (BBB)', sets: '5x10', weight: Math.round(tm.squat * 0.5), rest: '2분' },
                                    { name: '행잉 레그레이즈', sets: '5x15', weight: '체중', rest: '60초' }
                                ]
                            },
                            {
                                name: 'Day 3 - 벤치프레스',
                                exercises: [
                                    { name: '벤치프레스', sets: '5 @ 65%', weight: Math.round(tm.bench * 0.65), rest: '90초' },
                                    { name: '벤치프레스', sets: '5 @ 75%', weight: Math.round(tm.bench * 0.75), rest: '2분' },
                                    { name: '벤치프레스', sets: '5+ @ 85%', weight: Math.round(tm.bench * 0.85), rest: '3분' },
                                    { name: '오버헤드프레스 (BBB)', sets: '5x10', weight: Math.round(tm.press * 0.5), rest: '90초' },
                                    { name: '바벨로우', sets: '5x10', weight: Math.round(tm.bench * 0.6), rest: '90초' }
                                ]
                            },
                            {
                                name: 'Day 4 - 스쿼트',
                                exercises: [
                                    { name: '스쿼트', sets: '5 @ 65%', weight: Math.round(tm.squat * 0.65), rest: '90초' },
                                    { name: '스쿼트', sets: '5 @ 75%', weight: Math.round(tm.squat * 0.75), rest: '2분' },
                                    { name: '스쿼트', sets: '5+ @ 85%', weight: Math.round(tm.squat * 0.85), rest: '3분' },
                                    { name: '데드리프트 (BBB)', sets: '5x10', weight: Math.round(tm.deadlift * 0.5), rest: '2분' },
                                    { name: '레그컬', sets: '5x10', weight: '적정', rest: '60초' }
                                ]
                            }
                        ]
                    },
                    {
                        name: '2주차 (3/3/3+)',
                        days: [
                            {
                                name: 'Day 1 - 프레스',
                                exercises: [
                                    { name: '오버헤드프레스', sets: '3 @ 70%', weight: Math.round(tm.press * 0.70), rest: '90초' },
                                    { name: '오버헤드프레스', sets: '3 @ 80%', weight: Math.round(tm.press * 0.80), rest: '2분' },
                                    { name: '오버헤드프레스', sets: '3+ @ 90%', weight: Math.round(tm.press * 0.90), rest: '3분' },
                                    { name: '인클라인 벤치프레스 (BBB)', sets: '5x10', weight: Math.round(tm.bench * 0.5), rest: '90초' },
                                    { name: '친업', sets: '5x10', weight: '체중', rest: '90초' }
                                ]
                            },
                            {
                                name: 'Day 2 - 데드리프트',
                                exercises: [
                                    { name: '데드리프트', sets: '3 @ 70%', weight: Math.round(tm.deadlift * 0.70), rest: '90초' },
                                    { name: '데드리프트', sets: '3 @ 80%', weight: Math.round(tm.deadlift * 0.80), rest: '2분' },
                                    { name: '데드리프트', sets: '3+ @ 90%', weight: Math.round(tm.deadlift * 0.90), rest: '3분' },
                                    { name: '스쿼트 (BBB)', sets: '5x10', weight: Math.round(tm.squat * 0.5), rest: '2분' },
                                    { name: '행잉 레그레이즈', sets: '5x15', weight: '체중', rest: '60초' }
                                ]
                            },
                            {
                                name: 'Day 3 - 벤치프레스',
                                exercises: [
                                    { name: '벤치프레스', sets: '3 @ 70%', weight: Math.round(tm.bench * 0.70), rest: '90초' },
                                    { name: '벤치프레스', sets: '3 @ 80%', weight: Math.round(tm.bench * 0.80), rest: '2분' },
                                    { name: '벤치프레스', sets: '3+ @ 90%', weight: Math.round(tm.bench * 0.90), rest: '3분' },
                                    { name: '오버헤드프레스 (BBB)', sets: '5x10', weight: Math.round(tm.press * 0.5), rest: '90초' },
                                    { name: '바벨로우', sets: '5x10', weight: Math.round(tm.bench * 0.6), rest: '90초' }
                                ]
                            },
                            {
                                name: 'Day 4 - 스쿼트',
                                exercises: [
                                    { name: '스쿼트', sets: '3 @ 70%', weight: Math.round(tm.squat * 0.70), rest: '90초' },
                                    { name: '스쿼트', sets: '3 @ 80%', weight: Math.round(tm.squat * 0.80), rest: '2분' },
                                    { name: '스쿼트', sets: '3+ @ 90%', weight: Math.round(tm.squat * 0.90), rest: '3분' },
                                    { name: '데드리프트 (BBB)', sets: '5x10', weight: Math.round(tm.deadlift * 0.5), rest: '2분' },
                                    { name: '레그컬', sets: '5x10', weight: '적정', rest: '60초' }
                                ]
                            }
                        ]
                    },
                    {
                        name: '3주차 (5/3/1+)',
                        days: [
                            {
                                name: 'Day 1 - 프레스',
                                exercises: [
                                    { name: '오버헤드프레스', sets: '5 @ 75%', weight: Math.round(tm.press * 0.75), rest: '90초' },
                                    { name: '오버헤드프레스', sets: '3 @ 85%', weight: Math.round(tm.press * 0.85), rest: '2분' },
                                    { name: '오버헤드프레스', sets: '1+ @ 95%', weight: Math.round(tm.press * 0.95), rest: '3-5분' },
                                    { name: '인클라인 벤치프레스 (BBB)', sets: '5x10', weight: Math.round(tm.bench * 0.5), rest: '90초' },
                                    { name: '친업', sets: '5x10', weight: '체중', rest: '90초' }
                                ]
                            },
                            {
                                name: 'Day 2 - 데드리프트',
                                exercises: [
                                    { name: '데드리프트', sets: '5 @ 75%', weight: Math.round(tm.deadlift * 0.75), rest: '90초' },
                                    { name: '데드리프트', sets: '3 @ 85%', weight: Math.round(tm.deadlift * 0.85), rest: '2분' },
                                    { name: '데드리프트', sets: '1+ @ 95%', weight: Math.round(tm.deadlift * 0.95), rest: '3-5분' },
                                    { name: '스쿼트 (BBB)', sets: '5x10', weight: Math.round(tm.squat * 0.5), rest: '2분' },
                                    { name: '행잉 레그레이즈', sets: '5x15', weight: '체중', rest: '60초' }
                                ]
                            },
                            {
                                name: 'Day 3 - 벤치프레스',
                                exercises: [
                                    { name: '벤치프레스', sets: '5 @ 75%', weight: Math.round(tm.bench * 0.75), rest: '90초' },
                                    { name: '벤치프레스', sets: '3 @ 85%', weight: Math.round(tm.bench * 0.85), rest: '2분' },
                                    { name: '벤치프레스', sets: '1+ @ 95%', weight: Math.round(tm.bench * 0.95), rest: '3-5분' },
                                    { name: '오버헤드프레스 (BBB)', sets: '5x10', weight: Math.round(tm.press * 0.5), rest: '90초' },
                                    { name: '바벨로우', sets: '5x10', weight: Math.round(tm.bench * 0.6), rest: '90초' }
                                ]
                            },
                            {
                                name: 'Day 4 - 스쿼트',
                                exercises: [
                                    { name: '스쿼트', sets: '5 @ 75%', weight: Math.round(tm.squat * 0.75), rest: '90초' },
                                    { name: '스쿼트', sets: '3 @ 85%', weight: Math.round(tm.squat * 0.85), rest: '2분' },
                                    { name: '스쿼트', sets: '1+ @ 95%', weight: Math.round(tm.squat * 0.95), rest: '3-5분' },
                                    { name: '데드리프트 (BBB)', sets: '5x10', weight: Math.round(tm.deadlift * 0.5), rest: '2분' },
                                    { name: '레그컬', sets: '5x10', weight: '적정', rest: '60초' }
                                ]
                            }
                        ]
                    },
                    {
                        name: '4주차 (디로드)',
                        days: [
                            {
                                name: 'Day 1 - 프레스',
                                exercises: [
                                    { name: '오버헤드프레스', sets: '5 @ 40%', weight: Math.round(tm.press * 0.40), rest: '60초' },
                                    { name: '오버헤드프레스', sets: '5 @ 50%', weight: Math.round(tm.press * 0.50), rest: '90초' },
                                    { name: '오버헤드프레스', sets: '5 @ 60%', weight: Math.round(tm.press * 0.60), rest: '90초' }
                                ]
                            },
                            {
                                name: 'Day 2 - 데드리프트',
                                exercises: [
                                    { name: '데드리프트', sets: '5 @ 40%', weight: Math.round(tm.deadlift * 0.40), rest: '60초' },
                                    { name: '데드리프트', sets: '5 @ 50%', weight: Math.round(tm.deadlift * 0.50), rest: '90초' },
                                    { name: '데드리프트', sets: '5 @ 60%', weight: Math.round(tm.deadlift * 0.60), rest: '90초' }
                                ]
                            },
                            {
                                name: 'Day 3 - 벤치프레스',
                                exercises: [
                                    { name: '벤치프레스', sets: '5 @ 40%', weight: Math.round(tm.bench * 0.40), rest: '60초' },
                                    { name: '벤치프레스', sets: '5 @ 50%', weight: Math.round(tm.bench * 0.50), rest: '90초' },
                                    { name: '벤치프레스', sets: '5 @ 60%', weight: Math.round(tm.bench * 0.60), rest: '90초' }
                                ]
                            },
                            {
                                name: 'Day 4 - 스쿼트',
                                exercises: [
                                    { name: '스쿼트', sets: '5 @ 40%', weight: Math.round(tm.squat * 0.40), rest: '60초' },
                                    { name: '스쿼트', sets: '5 @ 50%', weight: Math.round(tm.squat * 0.50), rest: '90초' },
                                    { name: '스쿼트', sets: '5 @ 60%', weight: Math.round(tm.squat * 0.60), rest: '90초' }
                                ]
                            }
                        ]
                    }
                ],
                notes: [
                    '+ 표시는 AMRAP (As Many Reps As Possible) - 최대한 많은 횟수 수행',
                    'BBB (Boring But Big): 5x10 보조 운동으로 볼륨 증가',
                    '4주차는 회복 주간 - 가볍게 진행',
                    '5주차부터 Training Max를 5kg(하체), 2.5kg(상체) 증가 후 재시작',
                    '매 사이클마다 기록을 작성하여 진행 상황 추적'
                ]
            };
        }

        function generateTexasMethod(squat, bench, deadlift, press) {
            const volumeDay = {
                squat: squat * 0.9,
                bench: bench * 0.9,
                deadlift: deadlift * 0.9,
                press: press * 0.9
            };

            return {
                program: 'Texas Method',
                description: '주간 사이클 - 볼륨/회복/강도',
                weeks: [
                    {
                        name: '1주차',
                        days: [
                            {
                                name: 'Day 1 - 볼륨 데이 (월요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '5x5', weight: Math.round(volumeDay.squat), rest: '3분' },
                                    { name: '벤치프레스', sets: '5x5', weight: Math.round(volumeDay.bench), rest: '3분' },
                                    { name: '데드리프트', sets: '2x5', weight: Math.round(volumeDay.deadlift * 0.9), rest: '3분' },
                                    { name: '친업', sets: '3x8-10', weight: '체중', rest: '2분' }
                                ]
                            },
                            {
                                name: 'Day 2 - 회복 데이 (수요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '2x5', weight: Math.round(volumeDay.squat * 0.7), rest: '2분' },
                                    { name: '오버헤드프레스', sets: '3x5', weight: Math.round(volumeDay.press), rest: '3분' },
                                    { name: '백 익스텐션', sets: '3x10', weight: '체중', rest: '90초' },
                                    { name: '바벨컬', sets: '3x10', weight: '적정', rest: '90초' }
                                ]
                            },
                            {
                                name: 'Day 3 - 강도 데이 (금요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '1x5 (PR 시도)', weight: Math.round(volumeDay.squat * 1.05), rest: '5분' },
                                    { name: '벤치프레스', sets: '1x5 (PR 시도)', weight: Math.round(volumeDay.bench * 1.05), rest: '5분' },
                                    { name: '데드리프트', sets: '1x5 (PR 시도)', weight: Math.round(volumeDay.deadlift), rest: '5분' },
                                    { name: '바벨로우', sets: '3x8', weight: Math.round(volumeDay.bench * 0.7), rest: '2분' }
                                ]
                            }
                        ]
                    },
                    {
                        name: '2주차',
                        days: [
                            {
                                name: 'Day 1 - 볼륨 데이 (월요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '5x5', weight: Math.round(volumeDay.squat + 5), rest: '3분' },
                                    { name: '벤치프레스', sets: '5x5', weight: Math.round(volumeDay.bench + 2.5), rest: '3분' },
                                    { name: '데드리프트', sets: '2x5', weight: Math.round(volumeDay.deadlift * 0.9 + 5), rest: '3분' },
                                    { name: '친업', sets: '3x8-10', weight: '체중', rest: '2분' }
                                ]
                            },
                            {
                                name: 'Day 2 - 회복 데이 (수요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '2x5', weight: Math.round(volumeDay.squat * 0.7), rest: '2분' },
                                    { name: '오버헤드프레스', sets: '3x5', weight: Math.round(volumeDay.press + 2.5), rest: '3분' },
                                    { name: '백 익스텐션', sets: '3x10', weight: '체중', rest: '90초' },
                                    { name: '바벨컬', sets: '3x10', weight: '적정', rest: '90초' }
                                ]
                            },
                            {
                                name: 'Day 3 - 강도 데이 (금요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '1x5 (PR 시도)', weight: Math.round(volumeDay.squat * 1.05 + 5), rest: '5분' },
                                    { name: '벤치프레스', sets: '1x5 (PR 시도)', weight: Math.round(volumeDay.bench * 1.05 + 2.5), rest: '5분' },
                                    { name: '데드리프트', sets: '1x5 (PR 시도)', weight: Math.round(volumeDay.deadlift + 5), rest: '5분' },
                                    { name: '바벨로우', sets: '3x8', weight: Math.round(volumeDay.bench * 0.7), rest: '2분' }
                                ]
                            }
                        ]
                    },
                    {
                        name: '3주차',
                        days: [
                            {
                                name: 'Day 1 - 볼륨 데이 (월요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '5x5', weight: Math.round(volumeDay.squat + 10), rest: '3분' },
                                    { name: '벤치프레스', sets: '5x5', weight: Math.round(volumeDay.bench + 5), rest: '3분' },
                                    { name: '데드리프트', sets: '2x5', weight: Math.round(volumeDay.deadlift * 0.9 + 10), rest: '3분' },
                                    { name: '친업', sets: '3x8-10', weight: '체중', rest: '2분' }
                                ]
                            },
                            {
                                name: 'Day 2 - 회복 데이 (수요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '2x5', weight: Math.round(volumeDay.squat * 0.7), rest: '2분' },
                                    { name: '오버헤드프레스', sets: '3x5', weight: Math.round(volumeDay.press + 5), rest: '3분' },
                                    { name: '백 익스텐션', sets: '3x10', weight: '체중', rest: '90초' },
                                    { name: '바벨컬', sets: '3x10', weight: '적정', rest: '90초' }
                                ]
                            },
                            {
                                name: 'Day 3 - 강도 데이 (금요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '1x5 (PR 시도)', weight: Math.round(volumeDay.squat * 1.05 + 10), rest: '5분' },
                                    { name: '벤치프레스', sets: '1x5 (PR 시도)', weight: Math.round(volumeDay.bench * 1.05 + 5), rest: '5분' },
                                    { name: '데드리프트', sets: '1x5 (PR 시도)', weight: Math.round(volumeDay.deadlift + 10), rest: '5분' },
                                    { name: '바벨로우', sets: '3x8', weight: Math.round(volumeDay.bench * 0.7), rest: '2분' }
                                ]
                            }
                        ]
                    },
                    {
                        name: '4주차',
                        days: [
                            {
                                name: 'Day 1 - 볼륨 데이 (월요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '5x5', weight: Math.round(volumeDay.squat + 15), rest: '3분' },
                                    { name: '벤치프레스', sets: '5x5', weight: Math.round(volumeDay.bench + 7.5), rest: '3분' },
                                    { name: '데드리프트', sets: '2x5', weight: Math.round(volumeDay.deadlift * 0.9 + 15), rest: '3분' },
                                    { name: '친업', sets: '3x8-10', weight: '체중', rest: '2분' }
                                ]
                            },
                            {
                                name: 'Day 2 - 회복 데이 (수요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '2x5', weight: Math.round(volumeDay.squat * 0.7), rest: '2분' },
                                    { name: '오버헤드프레스', sets: '3x5', weight: Math.round(volumeDay.press + 7.5), rest: '3분' },
                                    { name: '백 익스텐션', sets: '3x10', weight: '체중', rest: '90초' },
                                    { name: '바벨컬', sets: '3x10', weight: '적정', rest: '90초' }
                                ]
                            },
                            {
                                name: 'Day 3 - 강도 데이 (금요일)',
                                exercises: [
                                    { name: '스쿼트', sets: '1x5 (PR 시도)', weight: Math.round(volumeDay.squat * 1.05 + 15), rest: '5분' },
                                    { name: '벤치프레스', sets: '1x5 (PR 시도)', weight: Math.round(volumeDay.bench * 1.05 + 7.5), rest: '5분' },
                                    { name: '데드리프트', sets: '1x5 (PR 시도)', weight: Math.round(volumeDay.deadlift + 15), rest: '5분' },
                                    { name: '바벨로우', sets: '3x8', weight: Math.round(volumeDay.bench * 0.7), rest: '2분' }
                                ]
                            }
                        ]
                    }
                ],
                notes: [
                    '월요일: 고볼륨으로 스트레스 축적',
                    '수요일: 가벼운 중량으로 회복 촉진',
                    '금요일: 최대 강도로 새로운 PR 달성',
                    '금요일 성공 시 다음 주 월요일 볼륨 중량 2.5-5kg 증가',
                    '3주 연속 실패 시 10% 디로드 후 재시작'
                ]
            };
        }

        function generateGZCL(squat, bench, deadlift, press, days) {
            const tm = {
                squat: squat * 0.85,
                bench: bench * 0.85,
                deadlift: deadlift * 0.85,
                press: press * 0.85
            };

            const weeks = [];
            for (let week = 1; week <= 4; week++) {
                const weekMultiplier = 1 + ((week - 1) * 0.025); // 주차별 2.5% 증가
                
                weeks.push({
                    name: `${week}주차`,
                    days: [
                        {
                            name: 'Day 1 - 스쿼트 중심',
                            exercises: [
                                { name: '[T1] 스쿼트', sets: '5x3', weight: Math.round(tm.squat * weekMultiplier), rest: '3-5분', note: '85% 1RM' },
                                { name: '[T2] 벤치프레스', sets: '3x10', weight: Math.round(tm.bench * 0.65 * weekMultiplier), rest: '2-3분', note: '65% 1RM' },
                                { name: '[T3] 루마니안 데드리프트', sets: '3x15', weight: Math.round(tm.deadlift * 0.5), rest: '90초' },
                                { name: '[T3] 레그컬', sets: '3x15', weight: '적정', rest: '90초' },
                                { name: '[T3] 행잉 레그레이즈', sets: '3x15', weight: '체중', rest: '60초' }
                            ]
                        },
                        {
                            name: 'Day 2 - 오버헤드프레스 중심',
                            exercises: [
                                { name: '[T1] 오버헤드프레스', sets: '5x3', weight: Math.round(tm.press * weekMultiplier), rest: '3-5분', note: '85% 1RM' },
                                { name: '[T2] 데드리프트', sets: '3x10', weight: Math.round(tm.deadlift * 0.65 * weekMultiplier), rest: '2-3분', note: '65% 1RM' },
                                { name: '[T3] 인클라인 덤벨프레스', sets: '3x15', weight: '적정', rest: '90초' },
                                { name: '[T3] 레터럴 레이즈', sets: '3x15', weight: '적정', rest: '90초' },
                                { name: '[T3] 페이스풀', sets: '3x20', weight: '가벼운 무게', rest: '60초' }
                            ]
                        },
                        {
                            name: 'Day 3 - 벤치프레스 중심',
                            exercises: [
                                { name: '[T1] 벤치프레스', sets: '5x3', weight: Math.round(tm.bench * weekMultiplier), rest: '3-5분', note: '85% 1RM' },
                                { name: '[T2] 스쿼트', sets: '3x10', weight: Math.round(tm.squat * 0.65 * weekMultiplier), rest: '2-3분', note: '65% 1RM' },
                                { name: '[T3] 덤벨로우', sets: '3x15', weight: '적정', rest: '90초' },
                                { name: '[T3] 트라이셉스 익스텐션', sets: '3x15', weight: '적정', rest: '90초' },
                                { name: '[T3] 바벨컬', sets: '3x15', weight: '적정', rest: '60초' }
                            ]
                        },
                        {
                            name: 'Day 4 - 데드리프트 중심',
                            exercises: [
                                { name: '[T1] 데드리프트', sets: '5x3', weight: Math.round(tm.deadlift * weekMultiplier), rest: '3-5분', note: '85% 1RM' },
                                { name: '[T2] 오버헤드프레스', sets: '3x10', weight: Math.round(tm.press * 0.65 * weekMultiplier), rest: '2-3분', note: '65% 1RM' },
                                { name: '[T3] 프론트 스쿼트', sets: '3x15', weight: Math.round(tm.squat * 0.5), rest: '2분' },
                                { name: '[T3] 친업', sets: '3xAMRAP', weight: '체중', rest: '2분' },
                                { name: '[T3] 플랭크', sets: '3x60초', weight: '체중', rest: '60초' }
                            ]
                        }
                    ]
                });
            }

            return {
                program: 'GZCL Method',
                description: '3-Tier 시스템 - 유연한 구조',
                weeks: weeks,
                notes: [
                    'T1 (주운동): 85%+ 1RM, 3-6회, 주당 10-15세트',
                    'T2 (보조운동): 65-75% 1RM, 6-10회, 주당 20-30세트',
                    'T3 (액세서리): 50-65% 1RM, 10-20회, 주당 30-60세트',
                    '진행 방식: T1 성공 시 다음 주 2.5-5kg 증가',
                    '실패 시: 횟수 감소 (5x3 → 6x2 → 10x1) 후 중량 재조정'
                ]
            };
        }

        function generateNSuns(squat, bench, deadlift, press, days) {
            const tm = {
                squat: squat * 0.9,
                bench: bench * 0.9,
                deadlift: deadlift * 0.9,
                press: press * 0.9
            };

            const weeks = [];
            for (let week = 1; week <= 4; week++) {
                const weekIncrease = (week - 1) * 5; // 주차별 5kg 증가
                const upperIncrease = (week - 1) * 2.5; // 상체는 2.5kg 증가
                
                weeks.push({
                    name: `${week}주차`,
                    days: [
                        {
                            name: 'Day 1 - 벤치프레스 & 오버헤드프레스',
                            exercises: [
                                { name: '벤치프레스', sets: '8 @ 65%', weight: Math.round(tm.bench * 0.65 + upperIncrease), rest: '2분' },
                                { name: '벤치프레스', sets: '6 @ 75%', weight: Math.round(tm.bench * 0.75 + upperIncrease), rest: '2분' },
                                { name: '벤치프레스', sets: '3 @ 85%', weight: Math.round(tm.bench * 0.85 + upperIncrease), rest: '2-3분' },
                                { name: '벤치프레스', sets: '5 @ 75%', weight: Math.round(tm.bench * 0.75 + upperIncrease), rest: '2분' },
                                { name: '벤치프레스', sets: '7 @ 70%', weight: Math.round(tm.bench * 0.70 + upperIncrease), rest: '2분' },
                                { name: '벤치프레스', sets: '4 @ 75%', weight: Math.round(tm.bench * 0.75 + upperIncrease), rest: '2분' },
                                { name: '벤치프레스', sets: '6 @ 70%', weight: Math.round(tm.bench * 0.70 + upperIncrease), rest: '2분' },
                                { name: '벤치프레스', sets: '8 @ 65%', weight: Math.round(tm.bench * 0.65 + upperIncrease), rest: '2분' },
                                { name: '오버헤드프레스', sets: '6 @ 50%', weight: Math.round(tm.press * 0.50 + upperIncrease), rest: '90초' },
                                { name: '오버헤드프레스', sets: '5 @ 60%', weight: Math.round(tm.press * 0.60 + upperIncrease), rest: '90초' },
                                { name: '오버헤드프레스', sets: '3 @ 70%', weight: Math.round(tm.press * 0.70 + upperIncrease), rest: '2분' },
                                { name: '오버헤드프레스', sets: '5 @ 70%', weight: Math.round(tm.press * 0.70 + upperIncrease), rest: '2분' },
                                { name: '오버헤드프레스', sets: '7 @ 65%', weight: Math.round(tm.press * 0.65 + upperIncrease), rest: '90초' },
                                { name: '오버헤드프레스', sets: '4 @ 65%', weight: Math.round(tm.press * 0.65 + upperIncrease), rest: '90초' },
                                { name: '오버헤드프레스', sets: '6 @ 60%', weight: Math.round(tm.press * 0.60 + upperIncrease), rest: '90초' },
                                { name: '오버헤드프레스', sets: '8+ @ 55%', weight: Math.round(tm.press * 0.55 + upperIncrease), rest: '90초', note: 'AMRAP' }
                            ]
                        },
                        {
                            name: 'Day 2 - 스쿼트 & 스모 데드리프트',
                            exercises: [
                                { name: '스쿼트', sets: '8 @ 65%', weight: Math.round(tm.squat * 0.65 + weekIncrease), rest: '2-3분' },
                                { name: '스쿼트', sets: '6 @ 75%', weight: Math.round(tm.squat * 0.75 + weekIncrease), rest: '3분' },
                                { name: '스쿼트', sets: '3 @ 85%', weight: Math.round(tm.squat * 0.85 + weekIncrease), rest: '3-4분' },
                                { name: '스쿼트', sets: '5 @ 75%', weight: Math.round(tm.squat * 0.75 + weekIncrease), rest: '3분' },
                                { name: '스쿼트', sets: '7 @ 70%', weight: Math.round(tm.squat * 0.70 + weekIncrease), rest: '2-3분' },
                                { name: '스쿼트', sets: '4 @ 75%', weight: Math.round(tm.squat * 0.75 + weekIncrease), rest: '3분' },
                                { name: '스쿼트', sets: '6 @ 70%', weight: Math.round(tm.squat * 0.70 + weekIncrease), rest: '2-3분' },
                                { name: '스쿼트', sets: '8 @ 65%', weight: Math.round(tm.squat * 0.65 + weekIncrease), rest: '2-3분' },
                                { name: '스모 데드리프트', sets: '6 @ 50%', weight: Math.round(tm.deadlift * 0.50 + weekIncrease), rest: '2분' },
                                { name: '스모 데드리프트', sets: '5 @ 60%', weight: Math.round(tm.deadlift * 0.60 + weekIncrease), rest: '2분' },
                                { name: '스모 데드리프트', sets: '3 @ 70%', weight: Math.round(tm.deadlift * 0.70 + weekIncrease), rest: '2-3분' },
                                { name: '스모 데드리프트', sets: '5 @ 70%', weight: Math.round(tm.deadlift * 0.70 + weekIncrease), rest: '2-3분' },
                                { name: '스모 데드리프트', sets: '7 @ 65%', weight: Math.round(tm.deadlift * 0.65 + weekIncrease), rest: '2분' },
                                { name: '스모 데드리프트', sets: '4 @ 65%', weight: Math.round(tm.deadlift * 0.65 + weekIncrease), rest: '2분' },
                                { name: '스모 데드리프트', sets: '6 @ 60%', weight: Math.round(tm.deadlift * 0.60 + weekIncrease), rest: '2분' },
                                { name: '스모 데드리프트', sets: '8+ @ 55%', weight: Math.round(tm.deadlift * 0.55 + weekIncrease), rest: '2분', note: 'AMRAP' }
                            ]
                        },
                        {
                            name: 'Day 3 - 오버헤드프레스 & 인클라인벤치',
                            exercises: [
                                { name: '오버헤드프레스', sets: '8 @ 65%', weight: Math.round(tm.press * 0.65 + upperIncrease), rest: '2분' },
                                { name: '오버헤드프레스', sets: '6 @ 75%', weight: Math.round(tm.press * 0.75 + upperIncrease), rest: '2분' },
                                { name: '오버헤드프레스', sets: '3 @ 85%', weight: Math.round(tm.press * 0.85 + upperIncrease), rest: '3분' },
                                { name: '오버헤드프레스', sets: '5 @ 75%', weight: Math.round(tm.press * 0.75 + upperIncrease), rest: '2분' },
                                { name: '오버헤드프레스', sets: '7 @ 70%', weight: Math.round(tm.press * 0.70 + upperIncrease), rest: '2분' },
                                { name: '오버헤드프레스', sets: '4 @ 75%', weight: Math.round(tm.press * 0.75 + upperIncrease), rest: '2분' },
                                { name: '오버헤드프레스', sets: '6 @ 70%', weight: Math.round(tm.press * 0.70 + upperIncrease), rest: '2분' },
                                { name: '오버헤드프레스', sets: '8 @ 65%', weight: Math.round(tm.press * 0.65 + upperIncrease), rest: '2분' },
                                { name: '인클라인 벤치프레스', sets: '6 @ 50%', weight: Math.round(tm.bench * 0.50 + upperIncrease), rest: '90초' },
                                { name: '인클라인 벤치프레스', sets: '5 @ 60%', weight: Math.round(tm.bench * 0.60 + upperIncrease), rest: '90초' },
                                { name: '인클라인 벤치프레스', sets: '3 @ 70%', weight: Math.round(tm.bench * 0.70 + upperIncrease), rest: '2분' },
                                { name: '인클라인 벤치프레스', sets: '5 @ 70%', weight: Math.round(tm.bench * 0.70 + upperIncrease), rest: '2분' },
                                { name: '인클라인 벤치프레스', sets: '7 @ 65%', weight: Math.round(tm.bench * 0.65 + upperIncrease), rest: '90초' },
                                { name: '인클라인 벤치프레스', sets: '4 @ 65%', weight: Math.round(tm.bench * 0.65 + upperIncrease), rest: '90초' },
                                { name: '인클라인 벤치프레스', sets: '6 @ 60%', weight: Math.round(tm.bench * 0.60 + upperIncrease), rest: '90초' },
                                { name: '인클라인 벤치프레스', sets: '8+ @ 55%', weight: Math.round(tm.bench * 0.55 + upperIncrease), rest: '90초', note: 'AMRAP' }
                            ]
                        },
                        {
                            name: 'Day 4 - 데드리프트 & 프론트스쿼트',
                            exercises: [
                                { name: '데드리프트', sets: '8 @ 65%', weight: Math.round(tm.deadlift * 0.65 + weekIncrease), rest: '2-3분' },
                                { name: '데드리프트', sets: '6 @ 75%', weight: Math.round(tm.deadlift * 0.75 + weekIncrease), rest: '3분' },
                                { name: '데드리프트', sets: '3 @ 85%', weight: Math.round(tm.deadlift * 0.85 + weekIncrease), rest: '3-5분' },
                                { name: '데드리프트', sets: '5 @ 75%', weight: Math.round(tm.deadlift * 0.75 + weekIncrease), rest: '3분' },
                                { name: '데드리프트', sets: '7 @ 70%', weight: Math.round(tm.deadlift * 0.70 + weekIncrease), rest: '2-3분' },
                                { name: '데드리프트', sets: '4 @ 75%', weight: Math.round(tm.deadlift * 0.75 + weekIncrease), rest: '3분' },
                                { name: '데드리프트', sets: '6 @ 70%', weight: Math.round(tm.deadlift * 0.70 + weekIncrease), rest: '2-3분' },
                                { name: '데드리프트', sets: '8 @ 65%', weight: Math.round(tm.deadlift * 0.65 + weekIncrease), rest: '2-3분' },
                                { name: '프론트 스쿼트', sets: '6 @ 50%', weight: Math.round(tm.squat * 0.50 + weekIncrease), rest: '2분' },
                                { name: '프론트 스쿼트', sets: '5 @ 60%', weight: Math.round(tm.squat * 0.60 + weekIncrease), rest: '2분' },
                                { name: '프론트 스쿼트', sets: '3 @ 70%', weight: Math.round(tm.squat * 0.70 + weekIncrease), rest: '2-3분' },
                                { name: '프론트 스쿼트', sets: '5 @ 70%', weight: Math.round(tm.squat * 0.70 + weekIncrease), rest: '2-3분' },
                                { name: '프론트 스쿼트', sets: '7 @ 65%', weight: Math.round(tm.squat * 0.65 + weekIncrease), rest: '2분' },
                                { name: '프론트 스쿼트', sets: '4 @ 65%', weight: Math.round(tm.squat * 0.65 + weekIncrease), rest: '2분' },
                                { name: '프론트 스쿼트', sets: '6 @ 60%', weight: Math.round(tm.squat * 0.60 + weekIncrease), rest: '2분' },
                                { name: '프론트 스쿼트', sets: '8+ @ 55%', weight: Math.round(tm.squat * 0.55 + weekIncrease), rest: '2분', note: 'AMRAP' }
                            ]
                        }
                    ]
                });
            }

            return {
                program: 'nSuns LP',
                description: '고볼륨 선형 진행 - 빠른 근력 향상',
                weeks: weeks,
                notes: [
                    '+ 세트는 AMRAP(최대 반복) - 5회 이상 성공 시 다음 주 중량 증가',
                    '상체 +2.5kg, 하체 +5kg씩 주간 증가',
                    '고볼륨 프로그램 - 충분한 영양과 수면 필수',
                    '각 운동일에 보조운동(액세서리) 3-5개 추가 권장',
                    '매 세션 기록 필수 - 앱 사용 권장'
                ]
            };
        }

        function displayRoutine(routine) {
            window.currentRoutine = routine; // 루틴을 전역 변수에 저장
            const resultSection = document.getElementById('resultSection');
            let html = `
                <div class="result-section">
                    <h2 class="section-title">${routine.program}</h2>
                    <p style="font-size: 1.1rem; color: #666; margin-bottom: 2rem;">${routine.description}</p>
            `;

            routine.weeks.forEach(week => {
                html += `<div class="week-header">${week.name}</div>`;
                week.days.forEach(day => {
                    html += `
                        <div class="day-card">
                            <h3 class="day-title">${day.name}</h3>
                    `;
                    day.exercises.forEach(exercise => {
                        html += `
                            <div class="exercise-item">
                                <div class="exercise-name">${exercise.name}</div>
                                <div class="exercise-details">
                                    ${exercise.sets} @ ${exercise.weight}kg • 휴식: ${exercise.rest}
                                    ${exercise.note ? ` • ${exercise.note}` : ''}
                                </div>
                            </div>
                        `;
                    });
                    html += `</div>`;
                });
            });

            html += `
                    <div class="notes-section">
                        <h4 class="notes-title">📋 중요 노트</h4>
                        <ul style="margin: 0; padding-left: 1.5rem;">
            `;
            routine.notes.forEach(note => {
                html += `<li style="margin-bottom: 0.5rem;">${note}</li>`;
            });
            html += `
                        </ul>
                    </div>
                    <div class="text-center mt-4">
                        <button class="btn-download" onclick="downloadRoutine()">PDF로 다운로드</button>
                    </div>
                </div>
            `;

            resultSection.innerHTML = html;
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function downloadRoutine() {
            if (!window.currentRoutine) {
                alert('루틴을 먼저 생성해주세요.');
                return;
            }

            // 브라우저 인쇄 창 열기
            window.print();
        }
