import { reactive } from 'vue';
import featureStore from './featureStore.js';
import moment from 'moment'
import { i18n } from 'src/plugins/utils';

const state = reactive({
    form: {},
});

export default function fieldsDetailsStore() {
    function factoryOfDynamicSelect(multiple) {
        try {
            const filters = featureStore().getSelectedFilters();
            return buildfilters(filters);
        } catch (error) {
            console.log('Factory::FieldsDetaild', error);
        }
    }
    function optionDate() {
        return [
            { label: i18n.tr('isite.cms.label.customRange'), value: 'customRange' },
            { label: i18n.tr('isite.cms.label.today'), value: 'today' },
            { label: i18n.tr('isite.cms.label.yesterday'), value: 'yesterday' },
            { label: i18n.tr('isite.cms.label.tomorrow'), value: 'tomorrow' },
            { label: i18n.tr('isite.cms.label.LastNumDays', { numDays: 7 }), value: 'lastSevenDays' },
            { label: i18n.tr('isite.cms.label.LastNumDays', { numDays: 30 }), value: 'lastThirtyDays' },
            { label: i18n.tr('isite.cms.label.LastNumDays', { numDays: 60 }), value: 'lastSixtyDays' },
            { label: i18n.tr('isite.cms.label.currentWeek'), value: 'currentWeek' },
            { label: i18n.tr('isite.cms.label.lastWeek'), value: 'lastWeek' },
            { label: i18n.tr('isite.cms.label.nextWeek'), value: 'nextWeek' },
            { label: i18n.tr('isite.cms.label.currentMonth'), value: 'currentMonth' },
            { label: i18n.tr('isite.cms.label.lastMonth'), value: 'lastMonth' },
            { label: i18n.tr('isite.cms.label.nextMonth'), value: 'nextMonth' },
            { label: i18n.tr('isite.cms.label.numMonthsAgo', { numMonths: 2 }), value: 'twoMonthsAgo' },
            { label: i18n.tr('isite.cms.label.currentYear'), value: 'currentYear' },
            { label: i18n.tr('isite.cms.label.lastYear'), value: 'lastYear' },
            { label: i18n.tr('isite.cms.label.numYearsAgo', { numYears: 2 }), value: 'twoYearsAgo' },
            { label: i18n.tr('isite.cms.label.lastNumYears', { numYears: 2 }), value: 'lastTwoYears' },
        ]
    }
    function getForm() {
        return state.form;
    }
    function removeObjectIdentifiers() {
        Object.entries(state.form).forEach(([key, value]) => {
            const filter = featureStore().getSelectedFilters().some(item => item.id === key);
            if (!filter) {
                delete state.form[key];
            }
        })
    }
    function changeDate(typeDate) {
        let fromDate = null;
        let toDate = null;
        switch (typeDate) {
            case 'today':
                fromDate = moment().format('YYYY-MM-DD 00:00:00')
                toDate = moment().format('YYYY-MM-DD 23:59:59')
                break;
            case 'yesterday':
                fromDate = moment().subtract(1, 'd').format('YYYY-MM-DD 00:00:00')
                toDate = moment().subtract(1, 'd').format('YYYY-MM-DD 23:59:59')
                break;
            case 'tomorrow':
                fromDate = moment().add(1, 'd').format('YYYY-MM-DD 00:00:00')
                toDate = moment().add(1, 'd').format('YYYY-MM-DD 23:59:59')
                break;
            case 'lastSevenDays':
                fromDate = moment().subtract(6, 'd').format('YYYY-MM-DD 00:00:00')
                toDate = moment().format('YYYY-MM-DD 23:59:59')
                break;
            case 'currentWeek':
                fromDate = moment().startOf('isoWeek').format('YYYY-MM-DD 00:00:00')
                toDate = moment().endOf('isoWeek').format('YYYY-MM-DD 23:59:59')
                break;
            case 'lastWeek':
                fromDate = moment().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD 00:00:00')
                toDate = moment().subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD 23:59:59')
                break;
            case 'nextWeek':
                fromDate = moment().add(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD 00:00:00')
                toDate = moment().add(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD 23:59:59')
                break;
            case 'lastThirtyDays':
                fromDate = moment().subtract(29, 'd').format('YYYY-MM-DD 00:00:00')
                toDate = moment().format('YYYY-MM-DD 23:59:59')
                break;
            case 'lastSixtyDays':
                fromDate = moment().subtract(59, 'd').format('YYYY-MM-DD 00:00:00')
                toDate = moment().format('YYYY-MM-DD 23:59:59')
                break;
            case 'currentMonth':
                fromDate = moment().startOf('month').format('YYYY-MM-DD 00:00:00')
                toDate = moment().endOf('month').format('YYYY-MM-DD 23:59:59')
                break;
            case 'lastMonth':
                fromDate = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD 00:00:00')
                toDate = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD 23:59:59')
                break;
            case 'nextMonth':
                fromDate = moment().add(1, 'months').startOf('month').format('YYYY-MM-DD 00:00:00')
                toDate = moment().add(1, 'months').endOf('month').format('YYYY-MM-DD 23:59:59')
                break;
            case 'twoMonthsAgo':
                fromDate = moment().subtract(2, 'months').startOf('month').format('YYYY-MM-DD 00:00:00')
                toDate = moment().subtract(2, 'months').endOf('month').format('YYYY-MM-DD 23:59:59')
                break;
            case 'twoYearsAgo':
                fromDate = moment().subtract(2, 'year').startOf('year').format('YYYY-MM-DD 00:00:00')
                toDate = moment().subtract(2, 'year').endOf('year').format('YYYY-MM-DD 23:59:59')
                break;
            case 'lastYear':
                fromDate = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD 00:00:00')
                toDate = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD 23:59:59')
                break;
            case 'lastTwoYears':
                fromDate = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD 00:00:00')
                toDate = moment().endOf('year').format('YYYY-MM-DD 23:59:59')
                break;
            case 'currentYear':
                fromDate = moment().startOf('year').format('YYYY-MM-DD 00:00:00')
                toDate = moment().endOf('year').format('YYYY-MM-DD 23:59:59')
                break;
            case '15daysAroundToday':
                fromDate = moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00');
                toDate = moment().add(7, 'days').format('YYYY-MM-DD 23:59:59');
                break;
            case '5daysAroundToday':
                fromDate = moment().subtract(2, 'days').format('YYYY-MM-DD 00:00:00');
                toDate = moment().add(2, 'days').format('YYYY-MM-DD 23:59:59');
                break;
            case 'customRange':
                if (fromDate)
                    fromDate = moment(fromDate).format('YYYY-MM-DD 00:00:00')
                if (toDate)
                    toDate = moment(toDate).format('YYYY-MM-DD 23:59:59')
                break;
        }
        return {fromDate, toDate}

    }
    function payloadFilter() {
        const filters = state.form;
        if (filters.date) {
            const selectedFilters = featureStore().getSelectedFilters();
            const date = selectedFilters.find(item  => item.id === 'date');
            filters.date = {
                "field": date.name,
                "type": filters.date,
                "from": changeDate(filters.date).fromDate,
                "to": changeDate(filters.date).toDate
            }
        }
        return {
            filters,
        }
    }
    function buildfilters(filterList, crud = false) {
        const data = {};
        filterList.forEach(item => {
            const valueItem  = item.id === 'date' ? item.value && item.value.type ? item.value.type : null : item.value || null;
            state.form[item.id] = valueItem || null;
            let loadOptions = {};
            const type = !item.type && item.id === 'date' ? 'select' : item.type;
            const options = !item.type && item.id === 'date' ? { options: optionDate() } : {};
            if (item.type && item.type === 'select' && item.loadOptions) {
                loadOptions = {
                    loadOptions: {
                        ...item.loadOptions
                    },
                }
            }
            if (crud && item.id === 'date') {
                if(item.type !== 'dateRange') {
                  data[item.id] = {
                      props: {
                          label: item.props.label
                      },
                      name: item.name,
                      field: item.field,
                      type: valueItem || null,
                      value: valueItem || null
                  }
                } else {
                  data[item.id] = {
                    props: {
                      label: item.props.label,
                      field: item.field,
                    },
                    quickFilter: item.quickFilter || false,
                    type: item.type,
                    value: valueItem || null
                  }
                }
            } else {
                const valueItem  = item.id === 'date' ? item.value && item.value.type ? item.value.type : null : state.form[item.id] || item.value || null
                data[item.id] = {
                    value: valueItem,
                    type: type,
                    props: {
                        ...item.props,
                        ...options,
                        readonly: typeof item.props.readonly === 'boolean' ? item.props.readonly : false,
                    },
                    ...loadOptions
                };
            }
        });
        return data;
    }
    function setForm(value) {
        state.form = value;
    }
    return {
        factoryOfDynamicSelect,
        removeObjectIdentifiers,
        getForm,
        payloadFilter,
        buildfilters,
        setForm
    }
}
