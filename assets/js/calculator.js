function calculate() {
	const salary = input.get('salary_amount').gt(0).val();
	const period = input.get('per_time').raw();
	const hoursPerWeek = input.get('work_hours').gt(0).lte(168).val();
	const daysPerWeek = input.get('work_days').gt(0).lte(7).val();
	const holidaysPerYear = input.get('holidays').gte(0).lte(365).val();
	const vacationDaysPerYear = input.get('vacation_days').gte(0).lte(365).val();
	if(!input.valid()) return;

	const coefficient =  260 / (260 - holidaysPerYear - vacationDaysPerYear);
	let daily;
	let dailyAdjusted;
	let hourly;
	let hourlyAdjusted;
	let weekly;
	let weeklyAdjusted;
	let biWeekly;
	let biWeeklyAdjusted;
	let monthly;
	let monthlyAdjusted;
	let semiMonthly;
	let semiMonthlyAdjusted;
	let quarterly;
	let quarterlyAdjusted;
	let annual;
	let annualAdjusted;
	switch(period) {
		case 'per hour':
			daily = salary * hoursPerWeek / daysPerWeek;
			hourly = salary;
			weekly = daily * daysPerWeek;
			biWeekly = weekly * 2;
			annual = daily * (52 * daysPerWeek);
			monthly = annual / 12;
			semiMonthly = monthly / 2;
			quarterly = monthly * 3;
			break;
		case 'per day':
			daily = salary;
			hourly = salary * daysPerWeek / hoursPerWeek;
			weekly = daily * daysPerWeek;
			biWeekly = weekly * 2;
			annual = daily * (52 * daysPerWeek);
			monthly = annual / 12;
			semiMonthly = monthly / 2;
			quarterly = monthly * 3;
			break;
		case 'per week':
			dailyAdjusted = salary / daysPerWeek;
			weeklyAdjusted = salary;
			hourlyAdjusted = dailyAdjusted * daysPerWeek / hoursPerWeek;
			biWeeklyAdjusted = weeklyAdjusted * 2;
			annualAdjusted = dailyAdjusted * (52 * daysPerWeek);
			monthlyAdjusted = annualAdjusted / 12;
			semiMonthlyAdjusted = monthlyAdjusted / 2;
			quarterlyAdjusted = monthlyAdjusted * 3;
			break;
		case 'per bi-week':
			biWeeklyAdjusted = salary;
			weeklyAdjusted = salary / 2;
			dailyAdjusted = weeklyAdjusted / daysPerWeek;
			hourlyAdjusted = weeklyAdjusted / hoursPerWeek;
			annualAdjusted = weeklyAdjusted * 52;
			monthlyAdjusted = annualAdjusted / 12;
			semiMonthlyAdjusted = monthlyAdjusted / 2;
			quarterlyAdjusted = monthlyAdjusted * 3;
			break;
		case 'per semi-month':
			semiMonthlyAdjusted = salary;
			monthlyAdjusted = semiMonthlyAdjusted * 2;
			annualAdjusted = monthlyAdjusted * 12;
			weeklyAdjusted = annualAdjusted / 52;
			biWeeklyAdjusted = weeklyAdjusted * 2;
			dailyAdjusted = weeklyAdjusted / daysPerWeek;
			hourlyAdjusted = weeklyAdjusted / hoursPerWeek;
			quarterlyAdjusted = monthlyAdjusted * 3;
			break;
		case 'per month':
			monthlyAdjusted = salary;
			semiMonthlyAdjusted = monthlyAdjusted / 2;
			annualAdjusted = monthlyAdjusted * 12;
			weeklyAdjusted = annualAdjusted / 52;
			biWeeklyAdjusted = weeklyAdjusted * 2;
			dailyAdjusted = weeklyAdjusted / daysPerWeek;
			hourlyAdjusted = weeklyAdjusted / hoursPerWeek;
			quarterlyAdjusted = monthlyAdjusted * 3;
			break;
		case 'per quarter':
			quarterlyAdjusted = salary;
			monthlyAdjusted = quarterlyAdjusted / 3;
			semiMonthlyAdjusted = monthlyAdjusted / 2;
			annualAdjusted = monthlyAdjusted * 12;
			weeklyAdjusted = annualAdjusted / 52;
			biWeeklyAdjusted = weeklyAdjusted * 2;
			dailyAdjusted = weeklyAdjusted / daysPerWeek;
			hourlyAdjusted = weeklyAdjusted / hoursPerWeek;
			break;
		case 'per year':
			annualAdjusted = salary;
			monthlyAdjusted = annualAdjusted / 12;
			quarterlyAdjusted = annualAdjusted / 4;
			semiMonthlyAdjusted = monthlyAdjusted / 2;
			weeklyAdjusted = annualAdjusted / 52;
			biWeeklyAdjusted = weeklyAdjusted * 2;
			dailyAdjusted = weeklyAdjusted / daysPerWeek;
			hourlyAdjusted = weeklyAdjusted / hoursPerWeek;
			break;
	}

	if(period === 'per hour' || period === 'per day'){
		hourlyAdjusted = hourly / coefficient;
		dailyAdjusted = daily / coefficient;
		weeklyAdjusted = weekly / coefficient;
		biWeeklyAdjusted = biWeekly / coefficient;
		annualAdjusted = annual / coefficient;
		monthlyAdjusted = monthly / coefficient;
		semiMonthlyAdjusted = semiMonthly / coefficient;
		quarterlyAdjusted = quarterly / coefficient;
	}
	else {
		hourly = hourlyAdjusted * coefficient;
		daily = dailyAdjusted * coefficient;
		weekly = weeklyAdjusted * coefficient;
		biWeekly = biWeeklyAdjusted * coefficient;
		annual = annualAdjusted * coefficient;
		monthly = monthlyAdjusted * coefficient;
		semiMonthly = semiMonthlyAdjusted * coefficient;
		quarterly = quarterlyAdjusted * coefficient;
	}

	_('hourly').innerHTML = moneyFormat(hourly);
	_('hourlyAdjusted').innerHTML = moneyFormat(hourlyAdjusted);
	_('daily').innerHTML = moneyFormat(daily);
	_('dailyAdjusted').innerHTML = moneyFormat(dailyAdjusted);
	_('weekly').innerHTML = moneyFormat(weekly);
	_('weeklyAdjusted').innerHTML = moneyFormat(weeklyAdjusted);
	_('biWeekly').innerHTML = moneyFormat(biWeekly);
	_('biWeeklyAdjusted').innerHTML = moneyFormat(biWeeklyAdjusted);
	_('semiMonthly').innerHTML = moneyFormat(semiMonthly);
	_('semiMonthlyAdjusted').innerHTML = moneyFormat(semiMonthlyAdjusted);
	_('monthly').innerHTML = moneyFormat(monthly);
	_('monthlyAdjusted').innerHTML = moneyFormat(monthlyAdjusted);
	_('quarterly').innerHTML = moneyFormat(quarterly);
	_('quarterlyAdjusted').innerHTML = moneyFormat(quarterlyAdjusted);
	_('annual').innerHTML = moneyFormat(annual);
	_('annualAdjusted').innerHTML = moneyFormat(annualAdjusted);
}

function moneyFormat(sum){
	const afterComma = sum >= 1000 ? 0 : 2;
	return '$' + numberWithCommas(sum.toFixed(afterComma));
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
