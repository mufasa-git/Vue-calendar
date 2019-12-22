<template>
  <div>
    <v-dialog v-model="modalDetail" persistent max-width="500px">

      <v-card>
        <v-card-text>
          <v-list
          dense
          >
            <v-list-tile>{{ editionDateFormatted }}</v-list-tile>
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.stop="modalDetail = false">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.stop="scheduleEdit">Edit</v-btn>
          <v-btn color="blue darken-1" flat @click.stop="scheduleDelete">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="modalEdit" persistent max-width="500px">
      <v-card>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-menu
                ref="datePickerMenu"
                :close-on-content-click="false"
                v-model="editionData.date.menu"
                :nudge-right="40"
                :return-value.sync="editionData.date.val"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="editionDateFormatted"
                  label="Date"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="editionData.date.val" @input="$refs.datePickerMenu.save(editionData.date.val)"></v-date-picker>
              </v-menu>

              <v-menu
                ref="timePickerMenu"
                :close-on-content-click="false"
                v-model="editionData.time.menu"
                :nudge-right="40"
                :return-value.sync="editionData.time.val"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px"
              >
                <v-text-field
                  slot="activator"
                  v-model="editionData.time.val"
                  label="Time"
                  prepend-icon="access_time"
                  readonly
                ></v-text-field>
                <v-time-picker
                  v-if="editionData.time.menu"
                  v-model="editionData.time.val"
                  @change="$refs.timePickerMenu.save(editionData.time.val)"
                ></v-time-picker>
              </v-menu>
            </v-layout>
          </v-container>
          <small>*Required fields</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.stop="scheduleCancel">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.stop="scheduleSave">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div id="top">
        <a href="#">
            <img src="../assets/images/img-bi.png" srcset="../assets/images/img-bi@2x.png 2x,../assets/images/img-bi@3x.png 3x">
        </a>
    </div>
    <div id="lnb">
        <div class="lnb-new-schedule">
            <button id="btn-new-schedule" type="button" class="btn btn-default btn-block lnb-new-schedule-btn" data-toggle="modal">
                New schedule</button>
        </div>
        <div id="lnb-calendars" class="lnb-calendars">
            <div>
                <div class="lnb-calendars-item">
                    <label>
                        <input class="tui-full-calendar-checkbox-square" type="checkbox" value="all" checked>
                        <span></span>
                        <strong>View all</strong>
                    </label>
                </div>
            </div>
            <div id="calendarList" class="lnb-calendars-d1">
            </div>
        </div>
        <div class="lnb-footer">
            © NHN Entertainment Corp.
        </div>
    </div>
	<div id="right">
	    <v-menu
	      v-model="menu"
	      :close-on-content-click="false"
	      :nudge-width="200"
	      offset-y
	      transition=false
	    >
	      <v-btn
	        slot="activator"
	        small
	        round
	        outline
	        flat
	      >
	        <v-icon small left color="black" id="calendarTypeIcon">view_day</v-icon>
	        <span  id="calendarTypeName">Daily</span>
	        <v-icon small right>keyboard_arrow_down</v-icon>
	      </v-btn>

	      <v-card>
	        <v-list
	        dense
	        id="dropdown_menu"
	        >

	          <v-list-tile @click="" role="menuitem" data-action="toggle-daily">
	            <v-list-tile-action>
	              <v-icon small color="black">view_day</v-icon>
	            </v-list-tile-action>
	            <v-list-tile-title>Daily</v-list-tile-title>
	          </v-list-tile>

	          <v-list-tile @click="" role="menuitem" data-action="toggle-weekly">
	            <v-list-tile-action>
	              <v-icon small color="black">view_week</v-icon>
	            </v-list-tile-action>
	            <v-list-tile-title>Weekly</v-list-tile-title>
	          </v-list-tile>

	          <v-list-tile @click="" role="menuitem" data-action="toggle-monthly">
	            <v-list-tile-action>
	              <v-icon small color="black">view_module</v-icon>
	            </v-list-tile-action>
	            <v-list-tile-title>Month</v-list-tile-title>
	          </v-list-tile>

	          <v-list-tile @click="" role="menuitem" data-action="toggle-weeks2">
	            <v-list-tile-action>
	              <v-icon small color="black">view_week</v-icon>
	            </v-list-tile-action>
	            <v-list-tile-title>2 weeks</v-list-tile-title>
	          </v-list-tile>

	          <v-list-tile @click="" role="menuitem" data-action="toggle-weeks3">
	            <v-list-tile-action>
	              <v-icon small color="black">view_week</v-icon>
	            </v-list-tile-action>
	            <v-list-tile-title>3 weeks</v-list-tile-title>
	          </v-list-tile>
	          
	          <v-list-tile @click="" role="menuitem" data-action="toggle-workweek">
	            <v-list-tile-action>
	              <v-checkbox v-model="showWeekends"></v-checkbox>
	            </v-list-tile-action>
	            <v-list-tile-title @click.prevent="showWeekends = !showWeekends" >Show weekends</v-list-tile-title>
	          </v-list-tile>

	          <v-list-tile @click="" role="menuitem" data-action="toggle-start-day-1">
	            <v-list-tile-action>
	              <v-checkbox v-model="startDay"></v-checkbox>
	            </v-list-tile-action>
	            <v-list-tile-title @click.prevent="startDay = !startDay" >Start Week on Monday</v-list-tile-title>
	          </v-list-tile>

	          <v-list-tile @click="" role="menuitem" data-action="toggle-narrow-weekend">
	            <v-list-tile-action>
	              <v-checkbox v-model="narrowWeekend"></v-checkbox>
	            </v-list-tile-action>
	            <v-list-tile-title @click.prevent="narrowWeekend = !narrowWeekend" >Narrower than weekdays</v-list-tile-title>
	          </v-list-tile>

	        </v-list>
	      </v-card>
	    </v-menu>

	    <span id="menu-navi">
	      <v-btn
	          small
	          round
	          outline
	          flat
	          data-action="move-today"
	        >
	          Today
	      </v-btn>

	      <v-btn
	          small
	          round
	          outline
	          icon
	          data-action="move-prev"
	        >
	        <v-icon data-action="move-prev">keyboard_arrow_left</v-icon>
	      </v-btn>

	      <v-btn
	          small
	          round
	          outline
	          icon
	          data-action="move-next"
	        >
	        <v-icon data-action="move-next">keyboard_arrow_right</v-icon>
	      </v-btn>
	    </span>

	    <span id="renderRange" class="render-range"></span>

	    <div id="calendar"></div>
	  </div>
	</div>
</template>

<script>
import 'tui-calendar/dist/tui-calendar.min.css';
import '../css/default.css';
import '../css/icons.css';

import moment from 'moment-timezone'
import 'chance'
import Calendar from 'tui-calendar'

export default {
  name: 'Schedule',
  data: function () {
    return {
      modalDetail: false,
      modalEdit: false,

      // Menu header
      menu: false,

      // View modes
      showWeekends: true,
      startDay: true,
      narrowWeekend: false,

      // Popup Edition
      editionData: {
        schedule: null,
        date: {
          menu: false, // Show date selector menu
          val: null // Value
        },
        time: {
          menu: false, // Show time selector menu
          val: null // Value
        }
      },
      guide: null,

    }
  },
  computed: {
    editionDateFormatted () {
      return this.editionData.date.val ? moment(this.editionData.date.val).format('DD/MM/YYYY'): ''
    },
    datePickerFormatted () {
      return this.editionData.date.val ? moment(this.editionData.date.val).format('YYYY-MM-DD'): ''
    }
  },
  methods: {
    scheduleEditClear: function () {
      this.editionData = {
        schedule: null,
        calendarId: '',
        id: '',
        date: {
          menu: false, // Show date selector menu
          val: null // Value
        },
        time: {
          menu: false, // Show time selector menu
          val: null // Value
        }
      }
    },
    scheduleEdit: function(){
      // Open edition popup
      this.modalEdit = true;

      // Close details popup
      this.modalDetail = false;
    },
    scheduleCancel: function(){
      // Close edition popup
      this.modalEdit = false

      // Clear selection
      this.guide.clearGuideElement();
    },
    scheduleDelete: function(){

      // Confirm
      let confirm = window.confirm('Are you sure you want to delete it?');
      if(confirm){
        // Delete turn
        window.cal.deleteSchedule(this.editionData.schedule.id, this.editionData.schedule.calendarId);

        // Close details popup
        this.modalDetail = false;
      }
    },
    scheduleSave: function () {

      // It is new?
      console.log('this.editionData.schedule: ', this.editionData.schedule);
      this.editionData.schedule.start = this.editionData.date.val + ' ' + this.editionData.time.val;
      this.editionData.schedule.end = this.editionData.date.val + ' ' + this.editionData.time.val;

      if (!this.editionData.schedule.id) {
        this.editionData.schedule.id = +new Date();
        console.log('creando...', this.editionData.schedule);
        window.cal.createSchedules([this.editionData.schedule]);
        this.guide.clearGuideElement();
      }else {
        console.log('actualizando...', this.editionData);
        window.cal.updateSchedule(this.editionData.schedule.id, this.editionData.schedule.calendarId, this.editionData.schedule);
      }

      this.modalEdit = false;
    },
  },
  mounted: function () {

    var CalendarList = [];
    var self = this;

    function CalendarInfo() {
        this.id = null;
        this.name = null;
        this.checked = true;
        this.color = null;
        this.bgColor = null;
        this.borderColor = null;
    }

    function addCalendar(calendar) {
        CalendarList.push(calendar);
    }

    function findCalendar(id) {
        var found;

        CalendarList.forEach(function(calendar) {
            if (calendar.id === id) {
                found = calendar;
            }
        });

        return found;
    }

    function hexToRGBA(hex) {
        var radix = 16;
        var r = parseInt(hex.slice(1, 3), radix),
            g = parseInt(hex.slice(3, 5), radix),
            b = parseInt(hex.slice(5, 7), radix),
            a = parseInt(hex.slice(7, 9), radix) / 255 || 1;
        var rgba = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';

        return rgba;
    }

    (function() {
        var calendar;
        var id = 0;

        calendar = new CalendarInfo();
        id += 1;
        calendar.id = String(id);
        calendar.name = 'My Calendar';
        calendar.color = '#ffffff';
        calendar.bgColor = '#9e5fff';
        calendar.dragBgColor = '#9e5fff';
        calendar.borderColor = '#9e5fff';
        addCalendar(calendar);

        calendar = new CalendarInfo();
        id += 1;
        calendar.id = String(id);
        calendar.name = 'Company';
        calendar.color = '#ffffff';
        calendar.bgColor = '#00a9ff';
        calendar.dragBgColor = '#00a9ff';
        calendar.borderColor = '#00a9ff';
        addCalendar(calendar);

        calendar = new CalendarInfo();
        id += 1;
        calendar.id = String(id);
        calendar.name = 'Family';
        calendar.color = '#ffffff';
        calendar.bgColor = '#ff5583';
        calendar.dragBgColor = '#ff5583';
        calendar.borderColor = '#ff5583';
        addCalendar(calendar);

        calendar = new CalendarInfo();
        id += 1;
        calendar.id = String(id);
        calendar.name = 'Friend';
        calendar.color = '#ffffff';
        calendar.bgColor = '#03bd9e';
        calendar.dragBgColor = '#03bd9e';
        calendar.borderColor = '#03bd9e';
        addCalendar(calendar);

        calendar = new CalendarInfo();
        id += 1;
        calendar.id = String(id);
        calendar.name = 'Travel';
        calendar.color = '#ffffff';
        calendar.bgColor = '#bbdc00';
        calendar.dragBgColor = '#bbdc00';
        calendar.borderColor = '#bbdc00';
        addCalendar(calendar);

        calendar = new CalendarInfo();
        id += 1;
        calendar.id = String(id);
        calendar.name = 'etc';
        calendar.color = '#ffffff';
        calendar.bgColor = '#9d9d9d';
        calendar.dragBgColor = '#9d9d9d';
        calendar.borderColor = '#9d9d9d';
        addCalendar(calendar);

        calendar = new CalendarInfo();
        id += 1;
        calendar.id = String(id);
        calendar.name = 'Birthdays';
        calendar.color = '#ffffff';
        calendar.bgColor = '#ffbb3b';
        calendar.dragBgColor = '#ffbb3b';
        calendar.borderColor = '#ffbb3b';
        addCalendar(calendar);

        calendar = new CalendarInfo();
        id += 1;
        calendar.id = String(id);
        calendar.name = 'National Holidays';
        calendar.color = '#ffffff';
        calendar.bgColor = '#ff4040';
        calendar.dragBgColor = '#ff4040';
        calendar.borderColor = '#ff4040';
        addCalendar(calendar);
    })();




    var ScheduleList = [];

    var SCHEDULE_CATEGORY = [
        'milestone',
        'task'
    ];

    function ScheduleInfo() {
        this.id = null;
        this.calendarId = null;

        this.title = null;
        this.isAllday = false;
        this.start = null;
        this.end = null;
        this.category = '';
        this.dueDateClass = '';

        this.color = null;
        this.bgColor = null;
        this.dragBgColor = null;
        this.borderColor = null;
        this.customStyle = '';

        this.isFocused = false;
        this.isPending = false;
        this.isVisible = true;
        this.isReadOnly = false;

        this.raw = {
            memo: '',
            hasToOrCc: false,
            hasRecurrenceRule: false,
            location: null,
            class: 'public', // or 'private'
            creator: {
                name: '',
                avatar: '',
                company: '',
                email: '',
                phone: ''
            }
        };
    }

    function generateTime(schedule, renderStart, renderEnd) {
        var baseDate = new Date(renderStart);
        var singleday = chance.bool({likelihood: 70});
        var startDate = moment(renderStart.getTime())
        var endDate = moment(renderEnd.getTime());
        var diffDate = endDate.diff(startDate, 'days');


        schedule.isAllday = chance.bool({likelihood: 30});
        if (schedule.isAllday) {
            schedule.category = 'allday';
        } else if (chance.bool({likelihood: 30})) {
            schedule.category = SCHEDULE_CATEGORY[chance.integer({min: 0, max: 1})];
            if (schedule.category === SCHEDULE_CATEGORY[1]) {
                schedule.dueDateClass = 'morning';
            }
        } else {
            schedule.category = 'time';
        }

        startDate.add(chance.integer({min: 0, max: diffDate}), 'days');
        startDate.hours(chance.integer({min: 0, max: 23}))
        startDate.minutes(chance.bool() ? 0 : 30);
        schedule.start = startDate.toDate();

        endDate = moment(startDate);
        if (schedule.isAllday) {
            endDate.add(chance.integer({min: 0, max: 3}), 'days');
        }

        schedule.end = endDate
            .add(chance.integer({min: 1, max: 4}), 'hour')
            .toDate();
    }

    function generateRandomSchedule(calendar, renderStart, renderEnd) {
        var schedule = new ScheduleInfo();

        schedule.id = chance.guid();
        schedule.calendarId = calendar.id;

        schedule.title = chance.sentence({words: 3});
        schedule.isReadOnly = chance.bool({likelihood: 20});
        generateTime(schedule, renderStart, renderEnd);

        schedule.isPrivate = chance.bool({likelihood: 10});
        schedule.location = chance.address();
        schedule.attendees = chance.bool({likelihood: 70}) ? ['anyone']: [];
        schedule.recurrenceRule = chance.bool({likelihood: 20});

        schedule.color = calendar.color;
        schedule.bgColor = calendar.bgColor;
        schedule.dragBgColor = calendar.dragBgColor;
        schedule.borderColor = calendar.borderColor;

        if (schedule.category === 'milestone') {
            schedule.color = schedule.bgColor;
            schedule.bgColor = 'transparent';
            schedule.dragBgColor = 'transparent';
            schedule.borderColor = 'transparent';
        }

        schedule.raw.memo = chance.sentence();
        schedule.raw.creator.name = chance.name();
        schedule.raw.creator.avatar = chance.avatar();
        schedule.raw.creator.company = chance.company();
        schedule.raw.creator.email = chance.email();
        schedule.raw.creator.phone = chance.phone();

        ScheduleList.push(schedule);
    }

    function generateSchedule(viewName, renderStart, renderEnd) {
        ScheduleList = [];
        CalendarList.forEach(function(calendar) {
            var i = 0, length = 10;
            if (viewName === 'month') {
                length = 15;
            } else if (viewName === 'day') {
                length = 4;
            }
            for (; i < length; i += 1) {
                generateRandomSchedule(calendar, renderStart, renderEnd);
            }
        });
    }


    var cal, resizeThrottled;
    var useCreationPopup = false;
    var useDetailPopup = false;
    var datePicker, selectedCalendar;

    cal = new Calendar('#calendar', {
        defaultView: 'month',
        useCreationPopup: useCreationPopup,
        useDetailPopup: useDetailPopup,
        calendars: CalendarList,
        template: {
            milestone: function(model) {
                return '<span class="calendar-font-icon ic-milestone-b"></span> <span style="background-color: ' + model.bgColor + '">' + model.title + '</span>';
            },
            allday: function(schedule) {
                return getTimeTemplate(schedule, true);
            },
            time: function(schedule) {
                return getTimeTemplate(schedule, false);
            }
        }
    });

    function yyyymmdd(dateIn) {
      var yyyy = dateIn.getFullYear();
      var mm = dateIn.getMonth()+1; // getMonth() is zero-based
      var dd  = dateIn.getDate();
      return String(10000*yyyy + 100*mm + dd); // Leading zeros for mm and dd
    }


    // event handlers
    cal.on({
        'clickSchedule': function(e) {

            // Fill popup with info
            self.editionData = Object.assign(self.editionData, {
              schedule: e.schedule,
              calendarId: e.schedule.calendarId,
              id: e.schedule.id,
              date: {
                menu: false,
                val: moment(e.schedule.start.getTime()).format('YYYY-MM-DD')
              },
              time: {
                menu: false,
                val: moment(e.schedule.start.getTime()).format('HH:mm')
              },
            });

            // Show details popup
            self.modalDetail = true;


            /* step1. open custom detail popup */
            /*const willModify = confirm(`title: ${e.schedule.title}\n when: ${yyyymmdd(new Date(e.schedule.start))} \nWill you update schedule?`);

            if (willModify) { // step1-1. open edit popup
                e.schedule.title = prompt('Schedule', e.schedule.title);
                cal.updateSchedule(e.schedule.id, e.schedule.calendarId, e.schedule);
            }*/
        },
        'clickDayname': function(date) {
            console.log('clickDayname', date);
        },
        'beforeCreateSchedule': function(e) {
            console.log('beforeCreateSchedule', e);

            self.scheduleEditClear();

            // Fill popup with info
            self.editionData = Object.assign(self.editionData, {
              schedule: {
                title: '',
                isAllDay: false,
                start: e.start,
                end: e.end,
                category:  'time'
              },
              calendarId: 1,
              //id: +new Date(),
              id: '',
              date: {
                menu: false,
                val: moment(e.start.getTime()).format('YYYY-MM-DD')
              },
              time: {
                menu: false,
                val: moment(e.start.getTime()).format('HH:mm')
              },
            });

            self.guide = e.guide;

            // Show edition popup
            self.modalEdit = true;

            /* step1. open custom edit popup */

            /*const title = prompt('Schedule', '@suvrity\'s birthday');
            var schedule = {
                id: +new Date(),
                title: title,
                isAllDay: false,
                start: e.start,
                end: e.end,
                category:  'time'
            };*/
            /* step2. save schedule */
            //cal.createSchedules([schedule]);
            /* step3. clear guide element */
            //e.guide.clearGuideElement();
        },
        'beforeUpdateSchedule': function(e) {
            console.log('beforeUpdateSchedule', e);
            e.schedule.start = e.start;
            e.schedule.end = e.end;
            cal.updateSchedule(e.schedule.id, e.schedule.calendarId, e.schedule);
        },
        'beforeDeleteSchedule': function(e) {
            console.log('beforeDeleteSchedule', e);
            cal.deleteSchedule(e.schedule.id, e.schedule.calendarId);
        },
        'afterRenderSchedule': function(e) {
            var schedule = e.schedule;
            // var element = cal.getElement(schedule.id, schedule.calendarId);
            // console.log('afterRenderSchedule', element);
        }
    });

    /**
     * Get time template for time and all-day
     * @param {Schedule} schedule - schedule
     * @param {boolean} isAllDay - isAllDay or hasMultiDates
     * @returns {string}
     */
    function getTimeTemplate(schedule, isAllDay) {
        var html = [];
        var start = moment(schedule.start.toUTCString());
        if (!isAllDay) {
            html.push('<strong>' + start.format('HH:mm') + '</strong> ');
        }
        if (schedule.isPrivate) {
            html.push('<span class="calendar-font-icon ic-lock-b"></span>');
            html.push(' Private');
        } else {
            if (schedule.isReadOnly) {
                html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
            } else if (schedule.recurrenceRule) {
                html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
            } else if (schedule.attendees.length) {
                html.push('<span class="calendar-font-icon ic-user-b"></span>');
            } else if (schedule.location) {
                html.push('<span class="calendar-font-icon ic-location-b"></span>');
            }
            html.push(' ' + schedule.title);
        }

        return html.join('');
    }

    /**
     * A listener for click the menu
     * @param {Event} e - click event
     */
    function onClickMenu(e) {

        // Fix to close expanded menu
        self.menu = false;

        var target = $(e.target).closest('a[role="menuitem"]')[0];
        var action = getDataAction(target);
        var options = cal.getOptions();
        var viewName = '';

        console.log(target);
        console.log(action);
        switch (action) {
            case 'toggle-daily':
                viewName = 'day';
                break;
            case 'toggle-weekly':
                viewName = 'week';
                break;
            case 'toggle-monthly':
                options.month.visibleWeeksCount = 0;
                viewName = 'month';
                break;
            case 'toggle-weeks2':
                options.month.visibleWeeksCount = 2;
                viewName = 'month';
                break;
            case 'toggle-weeks3':
                options.month.visibleWeeksCount = 3;
                viewName = 'month';
                break;
            case 'toggle-narrow-weekend':
                options.month.narrowWeekend = !options.month.narrowWeekend;
                options.week.narrowWeekend = !options.week.narrowWeekend;
                viewName = cal.getViewName();

                target.querySelector('input').checked = options.month.narrowWeekend;
                break;
            case 'toggle-start-day-1':
                options.month.startDayOfWeek = options.month.startDayOfWeek ? 0 : 1;
                options.week.startDayOfWeek = options.week.startDayOfWeek ? 0 : 1;
                viewName = cal.getViewName();

                target.querySelector('input').checked = options.month.startDayOfWeek;
                break;
            case 'toggle-workweek':
                options.month.workweek = !options.month.workweek;
                options.week.workweek = !options.week.workweek;
                viewName = cal.getViewName();

                target.querySelector('input').checked = !options.month.workweek;
                break;
            default:
                break;
        }

        cal.setOptions(options, true);
        cal.changeView(viewName, true);

        setDropdownCalendarType();
        setRenderRangeText();
        setSchedules();
    }

    function onClickNavi(e) {
        var action = getDataAction(e.target);

        switch (action) {
            case 'move-prev':
                cal.prev();
                break;
            case 'move-next':
                cal.next();
                break;
            case 'move-today':
                cal.today();
                break;
            default:
                return;
        }

        setRenderRangeText();
        setSchedules();
    }

    function onNewSchedule() {
        var title = $('#new-schedule-title').val();
        var location = $('#new-schedule-location').val();
        var isAllDay = document.getElementById('new-schedule-allday').checked;
        var start = datePicker.getStartDate();
        var end = datePicker.getEndDate();
        var calendar = selectedCalendar ? selectedCalendar : CalendarList[0];

        if (!title) {
            return;
        }

        cal.createSchedules([{
            id: String(chance.guid()),
            calendarId: calendar.id,
            title: title,
            isAllDay: isAllDay,
            start: start,
            end: end,
            category: isAllDay ? 'allday' : 'time',
            dueDateClass: '',
            color: calendar.color,
            bgColor: calendar.bgColor,
            dragBgColor: calendar.bgColor,
            borderColor: calendar.borderColor,
            raw: {
                location: location
            },
            state: 'Busy'
        }]);

        $('#modal-new-schedule').modal('hide');
    }

    function onChangeNewScheduleCalendar(e) {
        var target = $(e.target).closest('a[role="menuitem"]')[0];
        var calendarId = getDataAction(target);
        changeNewScheduleCalendar(calendarId);
    }

    function changeNewScheduleCalendar(calendarId) {
        var calendarNameElement = document.getElementById('calendarName');
        var calendar = findCalendar(calendarId);
        var html = [];

        html.push('<span class="calendar-bar" style="background-color: ' + calendar.bgColor + '; border-color:' + calendar.borderColor + ';"></span>');
        html.push('<span class="calendar-name">' + calendar.name + '</span>');

        calendarNameElement.innerHTML = html.join('');

        selectedCalendar = calendar;
    }

    function createNewSchedule(event) {
        var start = event.start ? new Date(event.start.getTime()) : new Date();
        var end = event.end ? new Date(event.end.getTime()) : moment().add(1, 'hours').toDate();

        if (useCreationPopup) {
            cal.openCreationPopup({
                start: start,
                end: end
            });
        }
    }
    function saveNewSchedule(scheduleData) {
        var calendar = scheduleData.calendar || findCalendar(scheduleData.calendarId);
        var schedule = {
            id: String(chance.guid()),
            title: scheduleData.title,
            isAllDay: scheduleData.isAllDay,
            start: scheduleData.start,
            end: scheduleData.end,
            category: scheduleData.isAllDay ? 'allday' : 'time',
            dueDateClass: '',
            color: calendar.color,
            bgColor: calendar.bgColor,
            dragBgColor: calendar.bgColor,
            borderColor: calendar.borderColor,
            raw: {
                'class': scheduleData.raw['class'],
                location: scheduleData.raw.location
            },
            state: scheduleData.state
        };
        if (calendar) {
            schedule.calendarId = calendar.id;
            schedule.color = calendar.color;
            schedule.bgColor = calendar.bgColor;
            schedule.borderColor = calendar.borderColor;
        }

        cal.createSchedules([schedule]);

        refreshScheduleVisibility();
    }

    function onChangeCalendars(e) {
        var calendarId = e.target.value;
        var checked = e.target.checked;
        var viewAll = document.querySelector('.lnb-calendars-item input');
        var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));
        var allCheckedCalendars = true;

        if (calendarId === 'all') {
            allCheckedCalendars = checked;

            calendarElements.forEach(function(input) {
                var span = input.parentNode;
                input.checked = checked;
                span.style.backgroundColor = checked ? span.style.borderColor : 'transparent';
            });

            CalendarList.forEach(function(calendar) {
                calendar.checked = checked;
            });
        } else {
            findCalendar(calendarId).checked = checked;

            allCheckedCalendars = calendarElements.every(function(input) {
                return input.checked;
            });

            if (allCheckedCalendars) {
                viewAll.checked = true;
            } else {
                viewAll.checked = false;
            }
        }

        refreshScheduleVisibility();
    }

    function refreshScheduleVisibility() {
        var calendarElements = Array.prototype.slice.call(document.querySelectorAll('#calendarList input'));

        CalendarList.forEach(function(calendar) {
            cal.toggleSchedules(calendar.id, !calendar.checked, false);
        });

        cal.render(true);

        calendarElements.forEach(function(input) {
            var span = input.nextElementSibling;
            span.style.backgroundColor = input.checked ? span.style.borderColor : 'transparent';
        });
    }

    function setDropdownCalendarType() {
        var calendarTypeName = document.getElementById('calendarTypeName');
        var calendarTypeIcon = document.getElementById('calendarTypeIcon');
        var options = cal.getOptions();
        var type = cal.getViewName();
        var iconClassName;

        if (type === 'day') {
            type = 'Daily';
            iconClassName = 'view_day';
        } else if (type === 'week') {
            type = 'Weekly';
            iconClassName = 'view_week';
        } else if (options.month.visibleWeeksCount === 2) {
            type = '2 weeks';
            iconClassName = 'view_week';
        } else if (options.month.visibleWeeksCount === 3) {
            type = '3 weeks';
            iconClassName = 'view_week';
        } else {
            type = 'Month';
            iconClassName = 'view_module';
        }

        calendarTypeName.innerHTML = type;
        calendarTypeIcon.innerHTML = iconClassName;
    }

    function setRenderRangeText() {
        var renderRange = document.getElementById('renderRange');
        var options = cal.getOptions();
        var viewName = cal.getViewName();
        var html = [];
        if (viewName === 'day') {
            html.push(moment(cal.getDate().getTime()).format('YYYY.MM.DD'));
        } else if (viewName === 'month' &&
            (!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4)) {
            html.push(moment(cal.getDate().getTime()).format('YYYY.MM'));
        } else {
            html.push(moment(cal.getDateRangeStart().getTime()).format('YYYY.MM.DD'));
            html.push(' ~ ');
            html.push(moment(cal.getDateRangeEnd().getTime()).format(' MM.DD'));
        }
        renderRange.innerHTML = html.join('');
    }

    function setSchedules() {
        cal.clear();
        generateSchedule(cal.getViewName(), cal.getDateRangeStart(), cal.getDateRangeEnd());
        cal.createSchedules(ScheduleList);
        refreshScheduleVisibility();
    }

    function setEventListener() {
        $('#menu-navi').on('click', onClickNavi);
        /*$('.dropdown-menu a[role="menuitem"]').on('click', onClickMenu);*/

        // Fix to dropdown
        $('#dropdown_menu .v-list__tile').on('click', onClickMenu);
        $('#lnb-calendars').on('change', onChangeCalendars);

        $('#btn-save-schedule').on('click', onNewSchedule);
        $('#btn-new-schedule').on('click', createNewSchedule);

        $('#dropdownMenu-calendars-list').on('click', onChangeNewScheduleCalendar);

        window.addEventListener('resize', resizeThrottled);
    }

    function getDataAction(target) {
        return target.dataset ? target.dataset.action : target.getAttribute('data-action');
    }

    /*resizeThrottled = tui.util.throttle(function() {
        cal.render();
    }, 50);*/

    window.cal = cal;

    // Fix to "Today" button
    $("#menu-navi").find("button[data-action='move-today']").children(".v-btn__content").attr('data-action', 'move-today');

    setDropdownCalendarType();
    setRenderRangeText();
    setSchedules();
    setEventListener();

    // set calendars
    (function() {
        var calendarList = document.getElementById('calendarList');
        var html = [];
        CalendarList.forEach(function(calendar) {
            html.push('<div class="lnb-calendars-item"><label>' +
                '<input type="checkbox" class="tui-full-calendar-checkbox-round" value="' + calendar.id + '" checked>' +
                '<span style="border-color: ' + calendar.borderColor + '; background-color: ' + calendar.borderColor + ';"></span>' +
                '<span>' + calendar.name + '</span>' +
                '</label></div>'
            );
        });
        calendarList.innerHTML = html.join('\n');
    })();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
